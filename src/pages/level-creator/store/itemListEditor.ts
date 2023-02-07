import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';

export const itemListEditorState = atom<(LevelEditorElement | null)[]>({
	key: 'itemListEditor',
	default: Array(GRID_NUMBER).fill(null),
});
