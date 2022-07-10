import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/home' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</UserProvider>
	);
}

export default App;
