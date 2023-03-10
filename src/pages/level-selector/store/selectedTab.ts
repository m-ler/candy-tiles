import { atom } from 'recoil';

export const selectedTabState = atom<number>({
	key: 'selectedTab',
	default: 0,
});
