import { useRecoilValue } from 'recoil';
import { toastListState } from '../store/toastList';

const ToastManager = () => {
	const toastList = useRecoilValue(toastListState);
	return <section id="toast-manager">{toastList.map((toast) => toast)}</section>;
};

export default ToastManager;
