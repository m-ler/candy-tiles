import { atom } from 'recoil';

const defaultValue: LevelData = {
	id: 0,
	userId: '',
	initialItems: [],
	initialTiles: [],
	score: 0,
	maximumMoves: 0,
	tasks: {
		iceTiles: 0,
		rockTiles: 0,
		iceCreams: 0,
	},
	rating: null,
};

export const selectedLevelState = atom<LevelData>({
	key: 'selectedLevel',
	default: defaultValue,
});
