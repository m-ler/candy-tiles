import { atom } from 'recoil';

export const allowSwapState = atom<boolean>({
	key: 'allowSwap',
	default: true,
});
