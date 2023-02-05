import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';

export const tileListEditorState = atom<(LevelEditorElement | null)[]>({
	key: 'tileListEditor',
	default: Array(GRID_NUMBER).fill(null),
});
