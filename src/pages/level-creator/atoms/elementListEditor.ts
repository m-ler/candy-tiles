import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';

export const elementListEditorState = atom<LevelEditorElement[]>({
	key: 'elementListEditor',
	default: Array(GRID_NUMBER).fill(null) as LevelEditorElement[],
});
