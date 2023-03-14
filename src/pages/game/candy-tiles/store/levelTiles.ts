import { atom } from 'recoil';
import { LevelTile } from '../types';

export const levelTilesState = atom<LevelTile[]>({
	key: 'levelTiles',
	default: [] as LevelTile[],
});
