import { useMutation } from 'react-query';
import { logOut } from '../api/auth';

export default () => {
	const logOutMutation = useMutation('logOut', logOut);
	return logOutMutation;
};
