import { atom } from 'recoil';

export const showClearEditorDialogState = atom<boolean>({
	key: 'showClearEditorDialog',
	default: false,
});
