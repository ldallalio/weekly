import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

function Home() {
	const auth = getAuth();
	const navigate = useNavigate();
	const onLogout = () => {
		auth.signOut();
		navigate('/');
		toast.success('Logged Out Successfully');
	};
	return (
		<div>
			<h1>Home</h1>

			<p>This is the home page.</p>

			<p>
				<a href='/dashboard'>Dashboard</a>
			</p>

			{/* button to logout */}
			<button className='logoutBtn' onClick={onLogout}>
				Logout
			</button>
		</div>
	);
}

export default Home;
