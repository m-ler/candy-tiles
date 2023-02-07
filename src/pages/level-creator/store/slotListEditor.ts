import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';

export const slotListEditorState = atom<boolean[]>({
	key: 'tileSlotListEditor',
	default: Array(GRID_NUMBER).fill(true),
});
