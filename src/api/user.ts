import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentSnapshot,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
	WithFieldValue,
	writeBatch,
} from 'firebase/firestore';
import { deleteObject, listAll, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import { UserDb } from '../types/database-aliases';
import { auth } from './../config/firebase-config';
import { supabase } from './../config/supabase-config';
import { checkFileExists } from './storage';

export const getUserDocumentById = async (userId: string): Promise<UserDocument | null> => {
	const docRef = doc(db, 'users', userId);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? (docSnap.data() as UserDocument) : null;
};

export const getUserProfile = async (userId: string) => supabase.from('users').select('*').eq('userId', userId);

export const updateUser = async (userId: string, newData: object) => supabase.from('users').update(newData).eq('userId', userId);

export const updateUserProfile = async (data: User): Promise<void> => {
	await updateProfile(auth.currentUser as User, data);
	return updateCurrentUser(auth, auth.currentUser);
};

export const getUserDocumentByEmail = async (email: string) => {
	const q = query(collection(db, 'users'), where('email', '==', email));
	const response = await getDocs(q);
	return (response?.docs || [])[0] || null;
};

export const updateUserDocument = async (userId: string, data: WithFieldValue<DocumentData>, mergeData: boolean) => {
	const userRef = doc(db, 'users', userId);
	await setDoc(userRef, data, { merge: mergeData });
};

export const uploadAvatar = async (file: File, userId: string) => {
	const fileExtension = file.type.split('/')[1];
	const fileName = `avatar.${fileExtension}`;
	const filePath = `${userId}/${fileName}`;
	const fileExists = await checkFileExists('media', userId, fileName);

	const { data, error } = fileExists
		? await supabase.storage.from('media').update(filePath, file)
		: await supabase.storage.from('media').upload(filePath, file);

	if (!!error) throw new Error('Could not upload file. Please try again.');

	const avatarURL = `${supabase.storage.from('media').getPublicUrl(data.path).data.publicUrl}?updated=${Date.now()}`;
	return supabase.from('users').update({ avatarURL }).eq('userId', userId);
};

export const deleteUserDocument = async (userId: string) => deleteDoc(doc(db, 'users', userId));

export const deleteUserMedia = async (userNickname: string): Promise<void> => {
	const listRef = ref(storage, `users/avatars/${userNickname}`);
	const listResults = await listAll(listRef);
	const deletePromises = listResults.items.map((item) => deleteObject(item));
	Promise.all(deletePromises);
};
