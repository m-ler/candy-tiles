import { atom } from 'recoil';
import { Toast } from '../types';

export const toastListState = atom<Toast[]>({
	key: 'toastList',
	default: [],
});
