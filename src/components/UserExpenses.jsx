import React, { useState, useContext, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import UserContext from '../context/UserContext';

function UserExpenses() {
	const { isLoggedIn } = useContext(UserContext);

	const navigate = useNavigate();
	if (!isLoggedIn) {
		console.log('User is not logged in');
		navigate('/');
	}

	/*************************************
	 * Users
	 * ************************************/

	const userId = auth.currentUser.uid;

	const [formData, setFormData] = useState({
		description: '',
		amount: '',
		expenseId: 1 + Math.random(),
	});

	/*************************************
	 * Form Data
	 * ************************************/

	const onSubmit = (e) => {
		e.preventDefault();
		//doc ref
		const expenseRef = collection(db, 'users/' + userId + '/expenses');
		//set doc
		setDoc(doc(expenseRef), formData);
		//reset form
		setFormData({
			description: '',
			amount: '',
			expenseId: 1 + Math.random(),
		});
	};
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	/*************************************
	 * Return Expenses
	 * ************************************/

	return (
		<div className='userExpenseContainer'>
			<h1>Current Spending</h1>
			<div className='expenseInputContainer'>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						placeholder='Expense Name'
						className='expenseInput'
						onChange={onChange}
						name='description'
					/>
					<input
						type='text'
						placeholder='Expense Amount'
						className='expenseInput'
						onChange={onChange}
						name='amount'
					/>
					<button className='addExpenseButton' onClick={onSubmit}>
						Add Expense
					</button>
				</form>
			</div>
			<div className='expenseListContainer'>
				<ExpenseList />
			</div>
		</div>
	);
}
export default UserExpenses;
