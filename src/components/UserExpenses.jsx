import React, { useState, useContext } from 'react';
import ExpenseList from './ExpenseList';
import UserContext from '../context/UserContext';

function UserExpenses() {
	const { userId, setUserId } = useContext(UserContext);
	setUserId(123);

	const [formData, setFormData] = useState({
		description: '',
		amount: '',
	});
	const [expenseItems, setExpenseItems] = useState([
		{
			uid: 123,
			userItems: [
				{ id: 1, description: 'Rent', amount: 950 },
				{ id: 2, description: 'Coffee', amount: 2.5 },
				{ id: 3, description: 'Restaurant', amount: -10 },
			],
		},
		{
			uid: 1234,
			userItems: [
				{ id: 1, description: 'Subway', amount: 950 },
				{ id: 2, description: 'Pizza', amount: 2.5 },
				{ id: 3, description: 'Steak', amount: -10 },
			],
		},
	]);

	//Check for userId in expenseItems
	const userItems =
		expenseItems
			.filter(
				(expenseItem) => {
					return expenseItem.uid === userId;
				},
				//If userId is found, return userItems
			)
			.map(
				(expenseItem) => {
					return expenseItem.userItems;
				},
				//If userId is not found, return empty array
			).length > 0
			? expenseItems.filter((expenseItem) => {
					return expenseItem.uid === userId;
			  })
			: [];

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
				<ExpenseList userItems={userItems} />
			</div>
		</div>
	);
}
export default UserExpenses;
