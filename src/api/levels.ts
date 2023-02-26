import { addDoc, collection, doc, DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { getRequest } from '../utils/fetch-request';

export const getLevel = (levelId: string, userId?: string): Promise<LevelData> => {
	const userLevel = !!userId;
	const url = userLevel ? '' : `/levels/${levelId}.json`;
	return getRequest<LevelData>(url);
};

export const saveLevel = (userId: string, file: string): Promise<DocumentReference<DocumentData>> =>
	addDoc(collection(db, 'levels'), {
		userId,
		file,
	});
