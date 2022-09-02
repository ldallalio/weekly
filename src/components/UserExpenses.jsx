import React, { useState, useContext, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import UserContext from '../context/UserContext';

function UserExpenses() {
	const { storedId } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);

	let userId = '';

	/*************************************
	 * Users
	 * ************************************/

	const [formData, setFormData] = useState({
		description: '',
		amount: '',
		expenseId: 1 + Math.random(),
	});
	/*************************************
	 * User Expenses
	 * ************************************/
	const [expenses, setExpenses] = useState(0);

	//Get exp amounts from localStorage
	const exp = JSON.parse(localStorage.getItem('expAmount'));

	const addExpenses = () => {
		let sum = 0;
		for (let i = 0; i < exp.length; i++) {
			sum += parseFloat(exp[i]);
		}
		setExpenses(sum);
	};
	useEffect(() => {
		console.log(exp);
		console.log(expenses);
		addExpenses();
		setIsLoading(false);
	}, []);

	/*************************************
	 * Form Data
	 * ************************************/

	const onSubmit = (e) => {
		e.preventDefault();
		//doc ref
		const expenseRef = collection(db, 'users/' + storedId + '/expenses');
		//set doc
		setDoc(doc(expenseRef), formData);
		//reset form data
		setFormData({
			description: '',
			amount: '',
			expenseId: 1 + Math.random(),
		});

		//Clear Input Fields
		document.getElementsByClassName('expenseInput')[0].value = '';
		document.getElementsByClassName('expenseInput')[1].value = '';

		//get all expenses
	};
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	/*************************************
	 * Return Expenses
	 * ************************************/
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<div className='userExpenseContainer'>
			<div className='spent'>
				<div className='spentText'>
					<h2>Spent</h2>
				</div>
				<div className='spentTotal'>
					{console.log(expenses)}
					<h2>{expenses}</h2>
				</div>
			</div>
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
