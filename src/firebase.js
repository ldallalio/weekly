// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCSHf_mwhCLhj_gJZUpkYQbDVCysOEQb8w',
	authDomain: 'weekly-1a616.firebaseapp.com',
	projectId: 'weekly-1a616',
	storageBucket: 'weekly-1a616.appspot.com',
	messagingSenderId: '677896905826',
	appId: '1:677896905826:web:3f1918c0c20d70b50e5d3b',
	measurementId: 'G-9BWG0MD56V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			authProvider: 'local',
			email,
			name: null,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	googleProvider,
	logInWithEmailAndPassword,
	logout,
	registerWithEmailAndPassword,
	sendPasswordReset,
	signInWithGoogle,
};
