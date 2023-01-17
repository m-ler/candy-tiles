import { atom } from 'recoil';

export const userInteractedWithDocumentState = atom<boolean>({
	key: 'userInteractedWithDocument',
	default: false,
});
