import { saveRecoilStateToStorage } from './../utils/storage';
import { atom } from 'recoil';
import { getStorageValue } from '../utils/storage';

const { savedValue, defaultValue, key } = getStorageValue('completed-levels', { main: [], online: [] });

type CompletedLevel = {
	id: number;
	stars: number;
};

export type CompletedLevels = {
	main: CompletedLevel[];
	online: CompletedLevel[];
};

export const completedLevelsState = atom<CompletedLevels>({
	key: 'completedLevels',
	default: defaultValue,
	effects: [({ setSelf, onSet }) => saveRecoilStateToStorage(savedValue, key, setSelf, onSet)],
});
