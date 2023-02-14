import { atom } from 'recoil';

const STORAGE_KEY = 'game-volume';

export const gameVolumeState = atom<number>({
	key: 'gameVolume',
	default: 1,
	effects: [
		({ setSelf, onSet }) => {
			const savedValue = localStorage.getItem(STORAGE_KEY);
			savedValue && setSelf(JSON.parse(savedValue));
			onSet((newValue) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue)));
		},
	],
});
