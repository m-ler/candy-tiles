import { useMutation } from 'react-query';
import { deleteUserAccount } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const errorMessages = {
	'AuthApiError': 'Your password was incorrect. Please double-check your password.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	const navigate = useNavigate();

	type UserDeleteData = {
		id: string;
		email: string;
		password: string;
	};
	const deleteAccountMutation = useMutation('logOut', (data: UserDeleteData) => deleteUserAccount(data.id, data.email, data.password), {
		onSuccess: (data) => {
			!data.error && navigate(0);
		},
	});

	const errorMessage = errorMessages[deleteAccountMutation.data?.error?.name || ''] || errorMessages['default'];
	return { deleteAccountMutation, errorMessage };
};
