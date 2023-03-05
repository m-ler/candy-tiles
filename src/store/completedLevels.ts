import { atom } from 'recoil';

const STORAGE_KEY = 'completed-main-levels';

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
	default: { main: [], online: [] },
	effects: [
		({ setSelf, onSet }) => {
			const savedValue = localStorage.getItem(STORAGE_KEY);
			savedValue && setSelf({ main: JSON.parse(savedValue), online: [] });
			onSet((newValue) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue.main)));
		},
	],
});
