import { atom } from 'recoil';
export const showDeleteAccountDialogState = atom<boolean>({
	key: 'deleteAccountDialog',
	default: false,
});
