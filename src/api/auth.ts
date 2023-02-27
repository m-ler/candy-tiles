import { AuthResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import {
	confirmPasswordReset,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	UserCredential,
	verifyPasswordResetCode,
} from 'firebase/auth';
import { auth, db } from '../config/firebase-config';
import { supabase } from '../config/supabase-config';
import { deleteUserDocument, deleteUserMedia, getUserDocumentByEmail, updateUserDocument } from './user';

export const createUser = async (email: string, nickname: string, password: string): Promise<PostgrestSingleResponse<null>> => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				nickname,
			},
		},
	});

	if (error) throw new Error('Something went wrong. Please try again');

	return supabase
		.from('users')
		.insert({
			userId: data.user?.id,
			email,
			createdAt: data.user?.created_at,
			nickname,
			avatarURL: null,
			passedLevels: null,
			ratedLevels: null,
		});
};

export const signIn = async ({ email, password }: SignInData): Promise<AuthResponse> =>
	supabase.auth.signInWithPassword({
		email,
		password,
	});

export const logOut = async () => supabase.auth.signOut();

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
	const userId = (await getUserDocumentByEmail(userEmail)).id;
	return updateUserDocument(userId, { password: newPassword }, true);
};
