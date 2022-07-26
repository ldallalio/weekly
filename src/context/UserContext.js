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

	const storedId = localStorage.getItem('userId');

	// console.log('Local storage' + storedId);
	useEffect(() => {
		if (storedId === user.uid) {
			setUserId(storedId);
			setIsLoggedIn(true);
		} else {
			if (user.uid != storedId) {
				setUserId(user.uid);
				localStorage.setItem('userId', user.uid);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		}
	}, []);
	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userId, storedId }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
