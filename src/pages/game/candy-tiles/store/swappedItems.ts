import { atom } from 'recoil';
import { SwappedItems } from '../types';

export const swappedItemsState = atom<SwappedItems>({
	key: 'swappedItems',
	default: [null, null] as SwappedItems,
});
