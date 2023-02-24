import { useMutation } from 'react-query';
import { deleteUserAccount } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

const errorMessages = {
	'auth/wrong-password': 'Your password was incorrect. Please double-check your password.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	const navigate = useNavigate();

	const deleteAccountMutation = useMutation<unknown, FirebaseError, string>('logOut', (password: string) => deleteUserAccount(password), {
		onSuccess: () => {
			navigate(0);
		},
	});

	const errorMessage = errorMessages[deleteAccountMutation.error?.code || ''] || errorMessages['default'];
	return { deleteAccountMutation, errorMessage };
};
