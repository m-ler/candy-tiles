import useToast from './useToast';
import { uploadAvatar } from '../api/user';
import { useMutation } from 'react-query';

export default () => {
	const toast = useToast();

	const uploadAvatarMutation = useMutation(
		'uploat-user-avatar',
		(file: File) => {
			return uploadAvatar(file);
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
			},
		},
	);

	return uploadAvatarMutation;
};
