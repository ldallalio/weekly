/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import navigation
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');

	const auth = getAuth();
	const user = auth.currentUser;
	// let tempUserId = '';
	// if (!user) {
	// 	console.log('no user');
	// 	tempUserId = 0;
	// } else {
	// 	console.log('user', user.uid);
	// 	tempUserId = user.uid;
	// }

	const storedId = localStorage.getItem('userId');

	// console.log('Local storage' + storedId);
	useEffect(() => {
		if (user) {
			console.log('user is logged in', user.uid);
			//Check if user id is in local storage is the same as the user id
			if (storedId === user.uid) {
				setIsLoggedIn(true);
				setUserId(user.uid);
			}
			//If not equal, then set local storage to the user id
			else {
				localStorage.setItem('userId', user.uid);
				setIsLoggedIn(true);
				setUserId(user.uid);
			}
		} else {
			console.log('no user');
			setIsLoggedIn(false);
			setUserId('');
			localStorage.removeItem('userId');
		}
	}, [user, storedId]);
	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userId, storedId }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
