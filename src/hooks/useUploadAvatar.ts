import useToast from './useToast';
import { uploadAvatar } from '../api/user';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../store/loggedUser';
import { refreshSession } from '../api/auth';

export default () => {
	const toast = useToast();
	const loggedUser = useRecoilValue(loggedUserState);

	const uploadAvatarMutation = useMutation(
		'uploat-user-avatar',
		(file: File) => {
			return uploadAvatar(file, loggedUser?.uid || '');
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
