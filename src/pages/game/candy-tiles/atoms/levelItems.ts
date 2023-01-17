import { atom } from 'recoil';

export const levelItemsState = atom<LevelItem[]>({
  key: 'levelItems',
  default: [] as LevelItem[]
});
