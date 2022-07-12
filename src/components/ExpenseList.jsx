import React, { useState, useEffect } from 'react';
import { db, getDocs, collection, query, onSnapshot } from '../firebase';

function ExpenseList() {
	const usersRef = collection(db, 'users');
	const expArr = [];
	const [expenses, setExpenses] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getDocs(usersRef)
			.then((snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	//If No Users, return empty list
	if (!users[0]) {
		return <div>Loading..</div>;
	}
	//If Users, return list of users
	let currentUserId = users[0].userId;
	const snapRef2 = collection(db, 'users/' + currentUserId + '/expenses');
	//this is the query for the expenses
	onSnapshot(snapRef2, (snapshot) => {
		snapshot.forEach((doc) => {
			//Push each expense to the expenses array
			expArr.push(doc.data());
			setExpenses(expArr);
		});
	});
	return (
		<div className='expenseItemContainer'>
			<h1>Expense List</h1>
			<ul>
				{expenses.map((expense, index) => {
					return (
						<li className='expenseItem' key={index}>
							<p>{expense.name}</p>
							<p>{expense.amount}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ExpenseList;
