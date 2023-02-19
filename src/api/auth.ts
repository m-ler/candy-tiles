import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

export const createUserDocument = async (data: UserDocData): Promise<void> => {
	const { uid, email, nickname, password } = data;
	const userRef = doc(db, 'users', uid);
	return setDoc(userRef, {
		email,
		nickname,
		password,
		levels: [],
	});
};

export const createUser = async (email: string, password: string): Promise<UserCredential> =>
	createUserWithEmailAndPassword(auth, email, password);
