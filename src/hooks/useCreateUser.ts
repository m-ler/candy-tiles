import { useMutation } from 'react-query';
import { createUser } from '../api/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const errorMessages = {
	'auth/email-already-in-use': 'That email is already in use.',
	'auth/invalid-email': 'Invalid email.',
	'auth/weak-password': 'That password is too weak.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	const navigate = useNavigate();
	const createUserMutation = useMutation<unknown, FirebaseError, UserData>(
		'createUser',
		({ email, nickname, password }: UserData) => createUser(email, nickname, password),
		{
			onSuccess: () => navigate(0),
		},
	);

	const errorMessage = errorMessages[createUserMutation.error?.code || ''] || errorMessages['default'];
	return { createUserMutation, errorMessage };
};
