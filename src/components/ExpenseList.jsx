import React from 'react';

function ExpenseList(expenseItems) {
	let expenseList = expenseItems.expenseItems.map((expenseItem) => {
		return (
			<div className='expenseItem' key={expenseItem.id}>
				<div className='expenseItem__description'>
					{expenseItem.description}
				</div>
				<div className='expenseItem__amount'>{expenseItem.amount}</div>
			</div>
		);
	});
	return <div className='expenseList'>{expenseList}</div>;
}

export default ExpenseList;
