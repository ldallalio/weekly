import React from 'react';

function ExpenseList(userItems) {
	console.log(userItems);
	// eslint-disable-next-line
	let myArr = userItems.userItems[0].userItems;
	// eslint-disable-next-line
	myArr.map((item) => {
		console.log(item.description);
	});
	return (
		<div className='expenseItemContainer'>
			<ul>
				{myArr.map((item, index) => {
					//Return each item in the array
					return (
						<div className='expenseItem' key={index}>
							<li key={item.id}>
								<p>{item.description}</p>
								<p>{item.amount}</p>
							</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
}

export default ExpenseList;
