import { FirebaseError } from 'firebase/app';
import { useMutation } from 'react-query';
import { signIn } from '../api/auth';

const errorMessages = {
	'auth/user-not-found': "The email you entered doesn't belong to an account.",
	'auth/wrong-password': 'Your password was incorrect. Please double-check your password.',
	'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	const signInMutation = useMutation<unknown, FirebaseError, SignInData>('signIn', (signInData: SignInData) => signIn(signInData));
	const errorMessage = errorMessages[signInMutation.error?.code || ''] || errorMessages['default'];
	return { signInMutation, errorMessage };
};
