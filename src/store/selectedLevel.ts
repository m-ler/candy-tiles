import { atom } from 'recoil';

export const selectedLevelState = atom<LevelData | null>({
	key: 'selectedLevel',
	default: null,
});
