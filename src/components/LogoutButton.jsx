import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import UserContext from '../context/UserContext';

function LogoutButton() {
	const { setIsLoggedIn } = useContext(UserContext);
	const auth = getAuth();
	const navigate = useNavigate();
	const onLogout = () => {
		auth.signOut();
		setIsLoggedIn(false);
		navigate('/');
		toast.success('Logged Out Successfully');
	};
	return (
		<button className='logoutBtn' onClick={onLogout}>
			Logout
		</button>
	);
}

export default LogoutButton;
