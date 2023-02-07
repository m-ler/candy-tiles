import { Button } from '@mui/material';
import { MdSave } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import useToast from '../../../hooks/useToast';
import createLevelData from '../createLevelData';
import validateLevel from './validateLevel';
import { levelDataEditorState } from '../store/levelDataEditor';

const SaveLevelButton = () => {
	const levelDataEditor = useRecoilValue(levelDataEditorState);
	const createToast = useToast();

	const handleClick = () => {
		const levelData = createLevelData(levelDataEditor);
		const validation = validateLevel(levelData, levelDataEditor.levelRules);
		console.log(validation);

		validation.messages.forEach((x) => createToast({ severity: 'error', message: x, durationMs: 3000 }));
	};

	return (
		<Button
			onClick={handleClick}
			startIcon={<MdSave />}
			sx={{ fontWeight: 'bolder', marginLeft: 'auto' }}
			variant="contained"
			size="small"
			disableElevation
		>
			Save
		</Button>
	);
};

export default SaveLevelButton;
