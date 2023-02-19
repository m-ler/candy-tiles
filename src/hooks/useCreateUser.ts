import { useMutation } from 'react-query';
import { createUser } from '../api/auth';

export default () => {
	const createUserMutation = useMutation('createUser', ({ email, nickname, password }: UserData) => createUser(email, nickname, password));
	return createUserMutation;
};
