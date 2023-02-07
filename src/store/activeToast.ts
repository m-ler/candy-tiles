import { selector } from 'recoil';
import { toastListState } from './toastList';

export const activeToastState = selector<Toast>({
	key: 'activeToast',
	get: ({ get }) => get(toastListState)[0],
});
