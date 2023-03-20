import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../store/loggedUser';

export default () => {
	const loggedUser = useRecoilValue(loggedUserState);
	return loggedUser;
};
