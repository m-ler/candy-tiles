import { useRecoilValue } from 'recoil';
import { completedLevelsState } from '../store/completedLevels';
import useLoggedUser from './useLoggedUser';

export default () => {
	const loggedUser = useLoggedUser();
	const localCompletedLevels = useRecoilValue(completedLevelsState);
	const completedLevels = loggedUser ? loggedUser.profile.completedLevels : localCompletedLevels;

	return completedLevels;
};
