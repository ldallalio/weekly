/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ExpenseList from './ExpenseList';

function UserExpenses() {
	const [formData, setFormData] = useState({
		description: '',
		amount: '',
	});
	const [expenseItems, setExpenseItems] = useState([
		{ id: 1, description: 'Rent', amount: 950 },
		{ id: 2, description: 'Coffee', amount: 2.5 },
		{ id: 3, description: 'Restaurant', amount: -10 },
	]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const newExpenseItem = {
			id: expenseItems.length + 1,
			...formData,
		};

		setExpenseItems([...expenseItems, newExpenseItem]);

		setFormData({
			description: '',
			amount: '',
		});

		// console.log(expenseItems);
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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
					<button className='addExpenseButton'>Add Expense</button>
				</form>
			</div>
			<div className='expenseListContainer'>
				<ExpenseList expenseItems={expenseItems} />
			</div>
		</div>
	);
}
export default UserExpenses;
