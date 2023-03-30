import { atom } from 'recoil';

export const levelEditorTitleState = atom<string>({
	key: 'levelEditorTitle',
	default: '',
});
