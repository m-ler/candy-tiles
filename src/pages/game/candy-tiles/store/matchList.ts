import { atom } from 'recoil';
import { MatchDetail } from '../types';

export const matchListState = atom<MatchDetail[]>({
	key: 'matchList',
	default: [] as MatchDetail[],
});
