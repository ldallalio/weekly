import React, { useState, useEffect, useContext } from 'react';
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
import UserContext from '../context/UserContext';

function ExpenseList() {
	const usersRef = collection(db, 'users');
	let expArr = [''];
	const [expenses, setExpenses] = useState([]);
	const [users, setUsers] = useState([]);
	const [currentUserId, setCurrentUserId] = useState('');

	/*************************************
	 * Users
	 * ************************************/
	const { storedId } = useContext(UserContext);
	const expValues = [];

	useEffect(() => {
		setCurrentUserId(storedId);
		// console.log('storedId', storedId);
		getDocs(usersRef)
			.then((snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	/*************************************
	 * Expenses
	 * ************************************/
	useEffect(() => {
		getExpenses();
	}, [expenses]);
	let getExpenses = () => {
		const snapRef2 = collection(db, 'users/' + storedId + '/expenses');
		onSnapshot(snapRef2, (snapshot) => {
			expArr = [];
			snapshot.forEach((doc) => {
				//Push each expense to the expenses array
				expArr.push([doc.data(), doc.id]);
				setExpenses(expArr);
				expValues.push(doc.data().amount);
				localStorage.setItem('expAmount', JSON.stringify(expValues));
			});
		});
	};
	//Delete Expense
	const deleteExpense = (id) => {
		//expense ref is the reference to the expense in the database
		const expenseRef = doc(
			db,
			'users/' + storedId + '/expenses/' + id.target.id,
		);
		deleteDoc(expenseRef);
		//Remove the expense from the expenses array
		expArr.splice(id.target.id, 1);
		getExpenses();
	};
	/*************************************
	 * Return Expenses
	 * ************************************/

	if (!users[0]) {
		return <div>No Expenses</div>;
	}
	return (
		// <h1>testing</h1>
		<div className='expenseItemContainer'>
			<h1>Expense List</h1>
			<ul>
				{expenses.map((expense) => {
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
