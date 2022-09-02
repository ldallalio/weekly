import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import UserContext from '../context/UserContext';

function LogoutButton() {
	const { setIsLoggedIn } = useContext(UserContext);
	const auth = getAuth();
	const navigate = useNavigate();
	const onLogout = () => {
		auth.signOut();
		setIsLoggedIn(false);
		localStorage.removeItem('userId');
		navigate('/');
		// toast.success('Logged Out Successfully');
		localStorage.setItem('expAmount', 0);
	};
	return (
		<button className='logoutBtn' onClick={onLogout}>
			Logout
		</button>
	);
}

export default LogoutButton;
