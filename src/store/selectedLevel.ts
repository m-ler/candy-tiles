import { atom } from 'recoil';
import { LevelData } from '../types';

export const selectedLevelState = atom<LevelData | null>({
	key: 'selectedLevel',
	default: null,
});
