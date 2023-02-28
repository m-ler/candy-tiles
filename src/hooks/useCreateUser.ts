import { useMutation } from 'react-query';
import { createUser } from '../api/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { AuthResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { useState } from 'react';

const errorMessages = {
	'auth/email-already-in-use': 'That email is already in use.',
	'auth/invalid-email': 'Invalid email.',
	'auth/weak-password': 'That password is too weak.',
	'default': 'There was an error on the server. Please try again later.',
} as { [key: string]: string };

export default (onUserCreated?: () => void) => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
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
		},
	);

	return { createUserMutation, errorMessage };
};
