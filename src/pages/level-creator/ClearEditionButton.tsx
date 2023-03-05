import { IconButton } from '@mui/material';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import Tooltip from '../../mui/components/Tooltip';
import { showClearEditorDialogState } from './store/showClearEditorDialog';

const ClearEditionButton = () => {
	const setShowClearEditor = useSetRecoilState(showClearEditorDialogState);

	return (
		<Tooltip title="Clear editor">
			<IconButton sx={{ color: 'primary.main' }} onClick={() => setShowClearEditor(true)}>
				<MdOutlineDeleteForever />
			</IconButton>
		</Tooltip>
	);
};

export default ClearEditionButton;
