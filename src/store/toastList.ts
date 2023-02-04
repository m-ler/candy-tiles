import { SnackbarProps } from '@mui/material';
import { ReactElement } from 'react';
import { atom } from 'recoil';

export const toastListState = atom<ReactElement<SnackbarProps>[]>({
	key: 'toastList',
	default: [],
});
