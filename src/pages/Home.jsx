import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserExpenses from '../components/UserExpenses';
import UserContext from '../context/UserContext';

function Home() {
	const { isLoggedIn } = useContext(UserContext);
	console.log(isLoggedIn);
	const navigate = useNavigate();

	//Check if user is logged in
	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	}, []);
	return (
		<div>
			<UserExpenses />
		</div>
	);
}

export default Home;
