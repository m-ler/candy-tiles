import { atom } from 'recoil';

export const itemDraggedState = atom<LevelTile | LevelItem>({
	key: 'itemDragged',
	default: null,
});
