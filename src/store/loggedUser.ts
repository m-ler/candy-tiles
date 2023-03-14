import { getStorageValue, saveRecoilStateToStorage } from './../utils/storage';
import { atom } from 'recoil';
import { LoggedUserData } from '../types';

const { savedValue, key } = getStorageValue('logged-user', null);

export const loggedUserState = atom<LoggedUserData | null>({
	key: 'loggedUser',
	default: savedValue,
	effects: [({ setSelf, onSet }) => saveRecoilStateToStorage(savedValue, key, setSelf, onSet)],
	dangerouslyAllowMutability: true,
});
