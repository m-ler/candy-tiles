import { atom } from 'recoil';

export const scoreState = atom<number>({
	key: 'score',
	default: 0,
});
