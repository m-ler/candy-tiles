import useToast from './useToast';
import { uploadAvatar } from '../api/user';
import { useMutation } from 'react-query';

const MAX_FILE_SIZE = 1024 * 1024;

export default () => {
	const toast = useToast();

	const uploadAvatarMutation = useMutation(
		'',
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

	/* const [uploadedFile, error] = await uploadFile(file, imagePath);

	if (error) {
		toast({
			message: 'There was an error uploading the image. Please try again.',
			severity: 'error',
			durationMs: 3000,
		});
		return;
	} */

	/* const fileStorageURL = `https://firebasestorage.googleapis.com/v0/b/${uploadedFile.metadata.bucket}/o/${encodeURIComponent(
		uploadedFile.metadata.fullPath,
	)}?alt=media`;

	await updateUserProfile({ photoURL: fileStorageURL });
	!!uploadedFile && toast.success('Avatar updated successfully.'); */
};
