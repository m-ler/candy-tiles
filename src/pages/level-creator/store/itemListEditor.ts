import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';
import { LevelEditorElement } from '../types';

export const itemListEditorState = atom<(LevelEditorElement | null)[]>({
	key: 'itemListEditor',
	default: Array(GRID_NUMBER).fill(null),
});
