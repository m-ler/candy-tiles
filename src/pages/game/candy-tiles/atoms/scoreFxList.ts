import { atom } from 'recoil';

export const scoreFxListState = atom<ScoreFx[]>({
	key: 'scoreFxList',
	default: [] as ScoreFx[],
});
