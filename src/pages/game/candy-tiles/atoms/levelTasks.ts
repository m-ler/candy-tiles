import { atom } from 'recoil';

type LevelTasks = {
	iceCreams: number;
	iceTiles: number;
	rockTiles: number;
};

export const levelTasksState = atom<LevelTasks>({
	key: 'levelTasks',
	default: {
		iceCreams: 0,
		iceTiles: 0,
		rockTiles: 0,
	} as LevelTasks,
});
