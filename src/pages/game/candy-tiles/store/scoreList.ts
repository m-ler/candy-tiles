import { atom } from 'recoil';
export const scoreListState = atom<number[]>({
	key: 'scoreList',
	default: [],
});
