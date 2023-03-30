import { atom } from 'recoil';
import { LevelEditorElement } from '../types';

export const selectedElementState = atom<LevelEditorElement | null>({
	key: 'selectedItem',
	default: null,
});
