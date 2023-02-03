import { atom } from 'recoil';

export const levelRulesState = atom<LevelRules>({
	key: 'levelRules',
	default: {
		targetScore: 100,
		maximumMoves: 10,
		tasks: {
			iceTiles: 0,
			rockTiles: 0,
			iceCreams: 0,
		},
	} as LevelRules,
});
