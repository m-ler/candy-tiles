import { Button } from '@mui/material';
import { MdDownload } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { downloadBase64File } from '../../utils/file';
import createLevelData from './createLevelData';
import { levelDataEditorState } from './store/levelDataEditor';
import Tooltip from './../../mui/components/Tooltip';

const DownloadLevelButton = () => {
	const levelDataEditor = useRecoilValue(levelDataEditorState);

	const handleClick = () => {
		const levelData = createLevelData(levelDataEditor);
		const levelDataBase64 = btoa(JSON.stringify(levelData));
		downloadBase64File('candy_tiles_level', 'json', levelDataBase64);
	};

	return (
		<Tooltip title="Export level to JSON file">
			<Button
				onClick={handleClick}
				startIcon={<MdDownload />}
				sx={{ fontWeight: 'bolder', marginLeft: 'auto', whiteSpace: 'nowrap', minWidth: 'auto', textOverflow: 'ellipsis' }}
				variant="contained"
				size="small"
				color="secondary"
				disableElevation
			>
				Download
			</Button>
		</Tooltip>
	);
};

export default DownloadLevelButton;
