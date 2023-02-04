import { Snackbar, SnackbarProps } from '@mui/material';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toastListState } from '../store/toastList';

type CreateToastCallback = (snackBar: SnackbarProps) => void;

export default (): CreateToastCallback => {
	const [toastList, setToastList] = useRecoilState(toastListState);

	useEffect(() => {
		console.log(toastList);
	}, [toastList]);

	return (snackBar: SnackbarProps) => {
		setToastList((list) => {

			if (list[0]) list[0].props.open = true;
			return [...list, <Snackbar {...snackBar} key={uuid()} ></Snackbar>];
		});
	};
};
