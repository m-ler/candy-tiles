import { useMutation } from 'react-query';
import { createUser, createUserDocument } from '../api/auth';

export default () => {
	const createUserDocMutation = useMutation('createUserDoc', (data: UserDocData) => createUserDocument(data));
	const createUserMutation = useMutation('createUser', ({ email, password }: UserData) => createUser(email, password), {
		onSuccess: (data, { email, password }) => {
			const { uid, displayName } = data.user;
			createUserDocMutation.mutate({ uid, email: email, nickname: displayName || '', password });
		},
	});

	return [createUserMutation, createUserDocMutation];
};
