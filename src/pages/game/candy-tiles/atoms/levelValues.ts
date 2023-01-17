import { atom } from 'recoil';

type LevelMoves = {
	total: number;
	done: number;
	spendAllMoves: boolean;
};

type LevelValues = {
	items: LevelItem[];
	moves: LevelMoves;
	allowSwap: boolean;
	tiles: LevelTile[];
	matchList: MatchDetail[];
	score: number;
	scoreFxList: ScoreFx[];
	swappedItems: SwappedItems;
};

export const levelValuesState = atom<LevelValues>({
	key: 'levelValues',
	default: {} as LevelValues,
});
