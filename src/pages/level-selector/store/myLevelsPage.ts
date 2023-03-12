import { atom } from 'recoil';
import { getStorageValue, saveRecoilStateToStorage } from '../../../utils/storage';

const { savedValue, defaultValue, key } = getStorageValue('myLevelsPage', 1);

export const myLevelsPageState = atom<number>({
	key: 'myLevelsPage',
	default: defaultValue,
	effects: [({ setSelf, onSet }) => saveRecoilStateToStorage(savedValue, key, setSelf, onSet)],
});
