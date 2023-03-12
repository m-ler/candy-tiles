import { atom } from 'recoil';
import { getStorageValue } from '../utils/storage';

const {savedValue, defaultValue, key} = getStorageValue('completed-main-levels', {main: [], online: []})

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
	effects: [
		({ setSelf, onSet }) => {
			const savedValue = localStorage.getItem(key);
			savedValue && setSelf({ main: JSON.parse(savedValue), online: [] });
			onSet((newValue) => localStorage.setItem(key, JSON.stringify(newValue.main)));
		},
	],
});
