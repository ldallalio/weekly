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
	let tempUserId = '';
	if (!user) {
		tempUserId = 0;
	} else {
		tempUserId = user.uid;
	}

	const storedId = localStorage.getItem('userId');

	// console.log('Local storage' + storedId);
	useEffect(() => {
		if (storedId === tempUserId) {
			setUserId(storedId);
			setIsLoggedIn(true);
		} else {
			if (tempUserId != storedId) {
				setUserId(tempUserId);
				localStorage.setItem('userId', tempUserId);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		}
	}, [user]);
	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userId, storedId }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
