import { saveRecoilStateToStorage, getStorageValue } from './../../../utils/storage';
import { atom } from 'recoil';

const { savedValue, key, defaultValue } = getStorageValue('online-levels-page', 1);

export const onlineLevelsPageState = atom<number>({
	key: 'onlineLevelsPage',
	default: defaultValue,
	effects: [({ setSelf, onSet }) => saveRecoilStateToStorage(savedValue, key, setSelf, onSet)],
});
