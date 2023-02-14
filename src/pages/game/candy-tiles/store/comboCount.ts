import { atom } from 'recoil';

export const comboCountState = atom<number>({
	key: 'comboCount',
	default: 0,
});
