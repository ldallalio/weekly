import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserExpenses from '../components/UserExpenses';
import UserContext from '../context/UserContext';
import {
	auth,
	db,
	getDocs,
	collection,
	query,
	onSnapshot,
	doc,
	deleteDoc,
	where,
} from '../firebase';

function Home() {
	const { isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	//Check if user is logged in
	useEffect(() => {
		if (!isLoggedIn && !auth.currentUser) {
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
