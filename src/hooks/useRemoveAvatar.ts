import useToast from './useToast';
import { updateUserProfile } from '../api/user';
import { useMutation } from 'react-query';
import { User } from 'firebase/auth';

const MAX_FILE_SIZE = 1024 * 1024;

export default () => {
	const toast = useToast();

	const uploadAvatarMutation = useMutation('remove-user-avatar', () => updateUserProfile({ photoURL: '' } as User), {
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
		},
	});

	return uploadAvatarMutation;
};
