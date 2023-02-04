import { atom } from 'recoil';

export const toastListState = atom<Toast[]>({
	key: 'toastList',
	default: [],
});
