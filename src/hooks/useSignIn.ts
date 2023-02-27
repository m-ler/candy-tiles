import { FirebaseError } from 'firebase/app';
import { useMutation } from 'react-query';
import { signIn } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '@supabase/supabase-js';
import { useState } from 'react';

const errorMessages = {
	'auth/user-not-found': "The email you entered doesn't belong to an account.",
	'auth/wrong-password': 'Your password was incorrect. Please double-check your password.',
	'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const signInMutation = useMutation<AuthResponse, unknown, SignInData>('signIn', (signInData: SignInData) => signIn(signInData), {
		onSuccess: (data) => {
			console.log(data);
			if (data.error) {
				setErrorMessage(data.error.message);
				return;
			}

			navigate(0);
		},
	});
	return { signInMutation, errorMessage };
};
