import { atom } from 'recoil';
import { GRID_NUMBER } from '../../../config';

export const tileListEditorState = atom<LevelTile[]>({
	key: 'tileList',
	default: Array(GRID_NUMBER).fill({ type: 'Normal' } as LevelTile),
});
