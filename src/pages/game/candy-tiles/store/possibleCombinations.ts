import { atom } from 'recoil';

export const possibleCombinationsState = atom<boolean>({
	key: 'possibleCombinations',
	default: true,
});
