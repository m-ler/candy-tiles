import { atom } from 'recoil';

export const levelTilesState = atom<boolean[]>({
	key: 'levelTiles',
	default: [] as boolean[],
});
