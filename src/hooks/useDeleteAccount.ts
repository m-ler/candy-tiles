import { useMutation } from 'react-query';
import { deleteUserAccount, logOut } from '../api/auth';

const errorMessages = {
	'AuthApiError': 'Your password was incorrect. Please double-check your password.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	type UserDeleteData = {
		id: string;
		email: string;
		password: string;
	};
	const deleteAccountMutation = useMutation('logOut', (data: UserDeleteData) => deleteUserAccount(data.id, data.email, data.password), {
		onSuccess: (data) => {
			!data.error && logOut();
		},
	});

	const errorMessage = errorMessages[deleteAccountMutation.data?.error?.name || ''] || errorMessages['default'];
	return { deleteAccountMutation, errorMessage };
};
