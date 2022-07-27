import React, { useState, useContext } from 'react';
// import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../context/UserContext';

function LoginForm() {
	const { setIsLoggedIn } = useContext(UserContext);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const { email, password } = formData;

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

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			if (userCredential.user) {
				// toast.success('Signed In Successfully');
				setIsLoggedIn(true);
				console.log('from login', auth.currentUser.uid);
				localStorage.setItem('userId', auth.currentUser.uid);
				navigate('/Home');
			}
		} catch (error) {
			// toast.error('Invalid Email or Password');
		}
	};

	return (
		<div className='loginFormContainer'>
			<h1>Signin to your Account</h1>

			{/* Create From to Login */}
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
					value={password}
					id='password'
					placeholder='Enter your password'
					onChange={onChange}
				/>
				<button type='submit'>Login</button>
			</form>
			<h2 className='signUpTitle'>Dont Have An Account?</h2>
			<Link to='/SignUp' className='signUpButton'>
				Sign Up
			</Link>
		</div>
	);
}

export default LoginForm;
