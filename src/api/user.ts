import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, listAll, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import { auth } from './../config/firebase-config';

export const updateUserProfile = async (data: User): Promise<void> => {
	await updateProfile(auth.currentUser as User, data);
	return updateCurrentUser(auth, auth.currentUser);
};

export const uploadAvatar = async (file: File): Promise<void> => {
	const fileExtension = file.type.split('/')[1];
	const imagePath = `users/avatars/${auth.currentUser?.displayName}/avatar.${fileExtension}`;
	const storageRef = ref(storage, imagePath);
	const uploadResult = await uploadBytes(storageRef, file);

	const fileStorageURL = `https://firebasestorage.googleapis.com/v0/b/${uploadResult.metadata.bucket}/o/${encodeURIComponent(
		uploadResult.metadata.fullPath,
	)}?alt=media&uptated=${Date.now()}`;

	return updateUserProfile({ photoURL: fileStorageURL } as User);
};

export const deleteUserDocument = async (userId: string) => deleteDoc(doc(db, 'users', userId));

export const deleteUserMedia = async (userNickname: string): Promise<void> => {
	const listRef = ref(storage, `users/avatars/${userNickname}`);
	const listResults = await listAll(listRef);
	const deletePromises = listResults.items.map((item) => deleteObject(item));
	Promise.all(deletePromises);
};
