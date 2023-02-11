import { atom } from 'recoil';

type LevelMoves = {
	total: number;
	done: number;
	spentAllMoves: boolean;
};

export const levelMovesState = atom<LevelMoves>({
	key: 'leftMoves',
	default: {
		total: 0,
		done: 0,
	} as LevelMoves,
});
