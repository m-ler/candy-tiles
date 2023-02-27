import useToast from './useToast';
import { updateUserDocument } from '../api/user';
import { useMutation } from 'react-query';
import { auth } from './../config/firebase-config';

export default () => {
	const toast = useToast();

	const uploadAvatarMutation = useMutation(
		'remove-user-avatar',
		() => updateUserDocument(auth.currentUser?.uid || '', { photoURL: '' }, true),
		{
			onError: () => {
				toast({
					message: 'There was an error removing the image. Please try again.',
					severity: 'error',
					durationMs: 3000,
				});
			},
			onSuccess: () => {
				toast({
					message: 'Avatar removed successfully.',
					severity: 'success',
					durationMs: 3000,
				});
				auth.currentUser?.reload();
			},
		},
	);

	return uploadAvatarMutation;
};
