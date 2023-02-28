import useToast from './useToast';
import { updateUser } from '../api/user';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../store/loggedUser';
import { refreshSession } from '../api/auth';
import { deleteDirectory } from '../api/storage';

export default () => {
	const toast = useToast();
	const loggedUser = useRecoilValue(loggedUserState);

	const uploadAvatarMutation = useMutation('remove-user-avatar', () => updateUser(loggedUser?.uid || '', { avatarURL: null }), {
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
			refreshSession();
			deleteDirectory('media', loggedUser?.uid || '');
		},
	});

	return uploadAvatarMutation;
};
