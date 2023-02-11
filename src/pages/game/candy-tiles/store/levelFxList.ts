import { atom } from 'recoil';

export const levelFxListState = atom<LevelFX[]>({
	key: 'levelFxList',
	default: [] as LevelFX[],
});
