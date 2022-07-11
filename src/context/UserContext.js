/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
