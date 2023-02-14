import { atom } from 'recoil';

export const showVolumeDialogState = atom<boolean>({
	key: 'showVolumeDialog',
	default: false,
});
