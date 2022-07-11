import React from 'react';

async function ExpenseList(userItems) {
	console.log(userItems);
	// eslint-disable-next-line
	let myArr = await userItems.userItems[0].userItems;
	// eslint-disable-next-line
	myArr.map((item) => {
		console.log(item.description);
	});
	return (
		<div>
			<ul>
				{myArr.map((item) => {
					//Return each item in the array
					return (
						<div className='expenseItem'>
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
