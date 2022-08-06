import React, { useState, useContext, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import UserContext from '../context/UserContext';

function UserExpenses() {
	const { storedId } = useContext(UserContext);

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
	const [expenses, setExpenses] = useState(100);
	const [expArr, setExpArr] = useState([]);
	//Get exp amounts from localStorage
	const getExpenses = () => {
		const exp = localStorage.getItem('expAmount');

		if (exp) {
			setExpArr(JSON.parse(exp));
		}
	};

	useEffect(() => {
		getExpenses();
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

	return (
		<div className='userExpenseContainer'>
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
