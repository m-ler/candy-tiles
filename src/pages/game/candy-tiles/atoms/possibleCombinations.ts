import { atom } from 'recoil';

export const possibleCombinationsState = atom<boolean>({
	key: 'avaliableCombinations',
	default: true,
});
