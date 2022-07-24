import React, { useState, useEffect } from 'react';
import {
	auth,
	db,
	getDocs,
	collection,
	query,
	onSnapshot,
	doc,
	deleteDoc,
	where,
} from '../firebase';

function ExpenseList() {
	const usersRef = collection(db, 'users');
	const expArr = [];
	const [expenses, setExpenses] = useState([]);
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState('');
	const [currentUserId, setCurrentUserId] = useState('');

	useEffect(() => {
		// Get current user
		setCurrentUserId(auth.currentUser.uid);
		getDocs(usersRef)
			.then((snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	/*************************************
	 * Users
	 * ************************************/

	//If No Users, return empty list
	if (!users[0]) {
		return <div>Loading..</div>;
	}

	/*************************************
	 * Expenses
	 * ************************************/

	const snapRef2 = collection(db, 'users/' + currentUserId + '/expenses');
	onSnapshot(snapRef2, (snapshot) => {
		snapshot.forEach((doc) => {
			//Push each expense to the expenses array
			expArr.push([doc.data(), doc.id]);
			setExpenses(expArr);
		});
	});

	//Delete Expense
	const deleteExpense = (id) => {
		//expense ref is the reference to the expense in the database
		const expenseRef = doc(
			db,
			'users/' + currentUserId + '/expenses/' + id.target.id,
		);
		deleteDoc(expenseRef);

		//Remove the expense from the expenses array
		expArr.splice(id.target.id, 1);
		setExpenses(expArr);
	};

	/*************************************
	 * Return Expenses
	 * ************************************/

	return (
		<div className='expenseItemContainer'>
			<h1>Expense List</h1>
			<ul>
				{expenses.map((expense) => {
					// console.log(expense);
					//Delete Expense document by expense id

					return (
						<li className='expenseItem' key={expense[0].expenseId}>
							<p className='desc'>{expense[0].description}</p>
							<p>{expense[0].amount}</p>
							<p onClick={deleteExpense} id={expense[1]}>
								X
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ExpenseList;
