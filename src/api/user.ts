import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase-config';
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
