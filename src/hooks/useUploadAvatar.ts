import useToast from './useToast';
import { uploadAvatar } from '../api/user';
import { useMutation } from 'react-query';
import { refreshSession } from '../api/auth';
import useLoggedUser from './useLoggedUser';

export default () => {
	const toast = useToast();
	const loggedUser = useLoggedUser();

	const uploadAvatarMutation = useMutation(
		'uploat-user-avatar',
		(file: File) => {
			return uploadAvatar(file, loggedUser?.auth.id || '');
		},
		{
			onError: () => {
				toast({
					message: 'There was an error uploading the image. Please try again.',
					severity: 'error',
					durationMs: 3000,
				});
			},
			onSuccess: () => {
				toast({
					message: 'Avatar updated successfully.',
					severity: 'success',
					durationMs: 3000,
				});
				refreshSession();
			},
		},
	);

	return uploadAvatarMutation;
};
