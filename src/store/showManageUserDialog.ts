import { atom } from 'recoil';
export const showManageUserDialogState = atom<boolean>({
	key: 'manageUserDialog',
	default: false,
});
