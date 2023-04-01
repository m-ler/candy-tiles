import { useMutation } from 'react-query';
import { createUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useState } from 'react';
import { UserData } from '../types';

export default (onUserCreated?: () => void) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	const onError = () => setErrorMessage('Sign up failed. Please try again.');
	const createUserMutation = useMutation<PostgrestSingleResponse<null>, unknown, UserData>(
		'createUser',
		({ email, nickname, password }: UserData) => createUser(email, nickname, password),
		{
			onSuccess: (data) => {
				if (data.error) {
					setErrorMessage(data.error.message);
					return;
				}

				onUserCreated?.();
				navigate(0);
			},
			onError: onError,
		},
	);

	return { createUserMutation, errorMessage };
};
