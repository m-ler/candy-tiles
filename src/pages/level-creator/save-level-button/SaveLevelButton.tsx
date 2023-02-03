import { Button } from '@mui/material';
import { MdSave } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { itemListEditorState } from '../atoms/itemListEditor';
import { levelRulesState } from '../atoms/levelRules';
import { slotListEditorState } from '../atoms/slotListEditor';
import { tileListEditorState } from '../atoms/tileListEditor';
import createLevelData from './createLevelData';
import validateLevel from './validateLevel';

const SaveLevelButton = () => {
	const slotList = useRecoilValue(slotListEditorState);
	const tileList = useRecoilValue(tileListEditorState);
	const itemList = useRecoilValue(itemListEditorState);
	const levelRules = useRecoilValue(levelRulesState);

	const handleClick = () => {
		const levelData = createLevelData({ slotList, tileList, itemList, levelRules });
		console.log(levelData);

		const validLevel = validateLevel(levelData, levelRules);
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
