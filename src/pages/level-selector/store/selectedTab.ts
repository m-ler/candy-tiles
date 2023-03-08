import { atom } from 'recoil';
const DEFAULT_VALUE = 0;
const STORAGE_KEY = 'level-selector-selected-tab';
const savedValue = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_VALUE));

export const selectedTabState = atom<number>({
	key: 'selectedTab',
	default: DEFAULT_VALUE,
	effects: [
		({ setSelf, onSet }) => {
			savedValue && setSelf(savedValue);
			onSet((newValue) => {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
			});
		},
	],
});
