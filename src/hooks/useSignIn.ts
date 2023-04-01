import { useMutation } from 'react-query';
import { signIn } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '@supabase/supabase-js';
import { useState } from 'react';
import { SignInData } from '../types';

export default () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const onError = () => setErrorMessage('Sign in failed. Please check your credentials and try again.');
	const signInMutation = useMutation<AuthResponse, unknown, SignInData>('signIn', (signInData: SignInData) => signIn(signInData), {
		onSuccess: (data) => {
			if (data.error) {
				onError();
				return;
			}

			navigate(0);
		},
		onError: onError,
	});
	return { signInMutation, errorMessage };
};
