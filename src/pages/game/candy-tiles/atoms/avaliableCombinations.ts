import { atom } from 'recoil';

export const avaliableCombinationsState = atom<boolean>({
	key: 'avaliableCombinations',
	default: true,
});
