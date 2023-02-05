import { atom } from 'recoil';

export const selectedElementState = atom<LevelEditorElement | null>({
	key: 'selectedItem',
	default: null,
});
