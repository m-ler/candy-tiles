import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeToastState } from '../store/activeToast';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { toastListState } from '../store/toastList';
import uuid from 'react-uuid';

const Toast = () => {
	const setToastList = useSetRecoilState(toastListState);
	const toast = useRecoilValue(activeToastState);

	const updateActiveToast = () => setToastList((list) => list.slice(1));

	const action = (
		<>
			<IconButton size="small" aria-label="close" color="inherit" onClick={updateActiveToast}>
				<MdClose />
			</IconButton>
		</>
	);

	return toast ? (
		<Snackbar
			open={true}
			action={action}
			key={uuid()}
			autoHideDuration={toast.durationMs}
			onClose={updateActiveToast}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			TransitionComponent={(props) => <Slide {...props} direction="up"></Slide>}
		>
			<Alert action={action} severity={toast.severity}>
				{toast.message}
			</Alert>
		</Snackbar>
	) : (
		<></>
	);
};

export default Toast;
