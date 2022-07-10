import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import UserContext from '../context/UserContext';

function SignUpForm() {
	const { setIsLoggedIn } = useContext(UserContext);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			});
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formData.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			toast.success('Account Created Successfully');
			setIsLoggedIn(true);
			navigate('/Home');
		} catch (error) {
			toast.error('Something went wrong with registration');
		}
	};

	return (
		<div className='loginFormContainer'>
			<h1>Sign Up</h1>

			{/* Create From to SignUp*/}
			<form onSubmit={onSubmit}>
				<label>Email</label>
				<input
					type='text'
					id='email'
					placeholder='Enter your email'
					onChange={onChange}
				/>
				<label>Password</label>
				<input
					type='password'
					id='password'
					placeholder='Enter your password'
					// value={password}
					onChange={onChange}
				/>
				<button type='submit'>Sign Up</button>
			</form>
			<h2 className='signUpTitle'>Already Have An Account?</h2>
			<Link to='/' className='signUpButton'>
				Login
			</Link>
		</div>
	);
}

export default SignUpForm;
