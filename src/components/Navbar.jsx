import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserContext from '../context/UserContext';

function Navbar() {
	const { isLoggedIn } = useContext(UserContext);

	//Check if user is logged in
	if (isLoggedIn) {
		//If user is logged in, display the logout button
		return (
			<div>
				<div className='navbarContainer'>
					<h1>Expense Tracker</h1>
					<LogoutButton />
				</div>
			</div>
		);
	} else {
		//If user is not logged in, display the login button
		return (
			<div>
				<div className='navbarContainer'>
					<h1>Expense Tracker</h1>
				</div>
			</div>
		);
	}
}

export default Navbar;
