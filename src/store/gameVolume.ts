import { atom } from 'recoil';

const DEFAULT_VOLUME = 1;
const STORAGE_KEY = 'game-volume';
const savedValue = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_VOLUME));

window.gameVolume = savedValue || DEFAULT_VOLUME;
export const gameVolumeState = atom<number>({
	key: 'gameVolume',
	default: DEFAULT_VOLUME,
	effects: [
		({ setSelf, onSet }) => {
			savedValue && setSelf(savedValue);
			onSet((newValue) => {
				window.gameVolume = newValue;
				localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
			});
		},
	],
});
