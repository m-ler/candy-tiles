import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';
import { LevelEditorElement } from '../types';

export const tileListEditorState = atom<(LevelEditorElement | null)[]>({
	key: 'tileListEditor',
	default: Array(GRID_NUMBER).fill(null),
});
