import { MdSave } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useToast from '../../../hooks/useToast';
import createLevelData from '../createLevelData';
import validateLevel from './validateLevel';
import { levelDataEditorState } from '../store/levelDataEditor';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { uploadLevel, UploadLevelData } from '../../../api/levels';
import { loggedUserState } from './../../../store/loggedUser';
import { showUserAuthDialogState } from '../../../store/showUserAuthenticationDialog';

const SaveLevelButton = () => {
	const levelDataEditor = useRecoilValue(levelDataEditorState);
	const loggedUser = useRecoilValue(loggedUserState);
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const toast = useToast();
	const validateLevelMutation = useMutation(
		(data: { levelData: LevelFile; levelRules: LevelRules }) => validateLevel(data.levelData, data.levelRules),
		{
			onSuccess: (data) => {
				if (data.valid) {
					onLevelValidationSuccess();
					return;
				}
				onLevelValidationFailed(data.messages);
			},
		},
	);

	const uploadLevelMutation = useMutation((data: UploadLevelData) => uploadLevel(data), {
		onSuccess: (data) => {
			if (data?.error) {
				onUploadLevelError();
				return;
			}
			toast({ message: 'Level saved!', severity: 'success', durationMs: 5000 });
		},
		onError: () => onUploadLevelError(),
	});

	const onUploadLevelError = () => toast({ message: 'Something went wrong. Please try again.', severity: 'error', durationMs: 5000 });
	const onLevelValidationFailed = (failMessages: string[]) => {
		failMessages.forEach((x) => toast({ severity: 'error', message: x, durationMs: 3000 }));
	};

	const onLevelValidationSuccess = () => {
		uploadLevelMutation.mutate({
			userId: loggedUser?.auth.id || '',
			levelTitle: levelDataEditor.levelTitle.trim(),
			levelJson: JSON.stringify(createLevelData(levelDataEditor)),
		});
	};

	const handleClick = () => {
		loggedUser ? saveLevel() : setShowUserAuthDialog(true);
	};

	const saveLevel = () => {
		const levelData = createLevelData(levelDataEditor);
		validateLevelMutation.mutate({ levelData, levelRules: levelDataEditor.levelRules });
	};

	return (
		<LoadingButton
			onClick={handleClick}
			startIcon={<MdSave />}
			loadingPosition="start"
			loading={uploadLevelMutation.isLoading || validateLevelMutation.isLoading}
			sx={{ fontWeight: 'bolder', marginLeft: 'auto' }}
			variant="contained"
			size="small"
			disableElevation
		>
			Save
		</LoadingButton>
	);
};

export default SaveLevelButton;
