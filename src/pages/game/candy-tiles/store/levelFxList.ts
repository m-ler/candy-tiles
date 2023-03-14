import { atom } from 'recoil';
import { LevelFX } from '../types';

export const levelFxListState = atom<LevelFX[]>({
	key: 'levelFxList',
	default: [] as LevelFX[],
});
