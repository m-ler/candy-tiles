import { atom } from 'recoil';

export const matchListState = atom<MatchDetail[]>({
	key: 'matchList',
	default: [] as MatchDetail[],
});
