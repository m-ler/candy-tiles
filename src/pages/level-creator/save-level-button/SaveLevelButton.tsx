import { MdSave } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import useToast from '../../../hooks/useToast';
import createLevelData from '../createLevelData';
import validateLevel from './validateLevel';
import { levelDataEditorState } from '../store/levelDataEditor';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { saveLevel } from '../../../api/levels';
import { loggedUserState } from './../../../store/loggedUser';

type LevelPayload = {
	userId: string;
	file: string;
};

const SaveLevelButton = () => {
	const levelDataEditor = useRecoilValue(levelDataEditorState);
	const loggedUser = useRecoilValue(loggedUserState);
	const toast = useToast();
	const saveLevelMutation = useMutation((data: LevelPayload) => saveLevel(data.userId, data.file), {
		onSuccess: () => {
			toast({ message: 'Level saved!', severity: 'success', durationMs: 5000 });
		},
		onError: () => {
			toast({ message: 'Something went wrong. Please try again.', severity: 'error', durationMs: 5000 });
		},
	});

	const handleClick = () => {
		const levelData = createLevelData(levelDataEditor);
		const validation = validateLevel(levelData, levelDataEditor.levelRules);
		validation.messages.forEach((x) => toast({ severity: 'error', message: x, durationMs: 3000 }));
		validation.valid && saveLevelMutation.mutate({ userId: loggedUser?.uid || '', file: JSON.stringify(createLevelData(levelDataEditor)) });
	};

	return (
		<LoadingButton
			onClick={handleClick}
			startIcon={<MdSave />}
			loadingPosition="start"
			loading={saveLevelMutation.isLoading}
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
