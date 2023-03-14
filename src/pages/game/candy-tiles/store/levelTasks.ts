import { atom } from 'recoil';
import { LevelTasks } from '../types';

export const levelTasksState = atom<LevelTasks>({
	key: 'levelTasks',
	default: {
		iceCreams: 0,
		iceTiles: 0,
		rockTiles: 0,
	} as LevelTasks,
});
