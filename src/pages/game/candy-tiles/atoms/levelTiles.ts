import { atom } from 'recoil';

export const levelTilesState = atom<LevelTile[]>({
	key: 'levelTiles',
	default: [] as LevelTile[],
});
