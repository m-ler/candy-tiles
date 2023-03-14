import { atom } from 'recoil';
import { LevelItem } from '../types';

export const levelItemsState = atom<LevelItem[]>({
  key: 'levelItems',
  default: [] as LevelItem[]
});
