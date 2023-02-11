import { atom } from 'recoil';

export const swappedItemsState = atom<SwappedItems>({
	key: 'swappedItems',
	default: [null, null] as SwappedItems,
});
