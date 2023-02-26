import {
	ActionCodeInfo,
	AuthCredential,
	confirmPasswordReset,
	createUserWithEmailAndPassword,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	User,
	UserCredential,
	verifyPasswordResetCode,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';
import { deleteUserDocument, deleteUserMedia, updateUserDocument } from './user';

export const createUser = async (email: string, nickname: string, password: string): Promise<User> => {
	const createdUserCrendential = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(createdUserCrendential.user, {
		displayName: nickname,
	});

	const userRef = doc(db, 'users', createdUserCrendential.user.uid);
	await setDoc(userRef, {
		email,
		nickname,
		password,
		passedLevels: [],
	});

	return createdUserCrendential.user;
};

export const signIn = async ({ email, password }: SignInData): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
export const logOut = async (): Promise<void> => signOut(auth);

export const reauthenticateUser = async (password: string): Promise<UserCredential | undefined> => {
	if (auth.currentUser === null) return;

	const authCredential = EmailAuthProvider.credential(auth.currentUser.email || '', password);
	return reauthenticateWithCredential(auth.currentUser, authCredential);
};

export const deleteUserAccount = async (password: string): Promise<void> => {
	if (auth.currentUser === null) return;
	const userId = auth.currentUser.uid;
	const userNickname = auth.currentUser.displayName;

	await reauthenticateUser(password);
	await deleteUser(auth.currentUser);
	await deleteUserMedia(userNickname || '');
	return await deleteUserDocument(userId);
};

export const sendPaswordRecovery = async (email: string) => sendPasswordResetEmail(auth, email);

export const resetPassword = async (actionCode: string, newPassword: string): Promise<void> => {
	const userEmail = await verifyPasswordResetCode(auth, actionCode);
	await confirmPasswordReset(auth, actionCode, newPassword);
	return updateUserDocument(userEmail, { password: newPassword });
};
