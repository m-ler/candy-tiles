import { atom } from 'recoil';

export const finishedMovingState = atom<boolean>({
	key: 'finishedMoving',
	default: true,
});
