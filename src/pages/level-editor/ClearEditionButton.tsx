import { IconButton, Tooltip } from '@mui/material';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { showClearEditorDialogState } from './store/showClearEditorDialog';

const ClearEditionButton = () => {
	const setShowClearEditor = useSetRecoilState(showClearEditorDialogState);

	return (
		<Tooltip title="Clear editor">
			<IconButton sx={{ color: 'primary.main' }} onClick={() => setShowClearEditor(true)} data-cy="clear-editor-button">
				<MdOutlineDeleteForever />
			</IconButton>
		</Tooltip>
	);
};

export default ClearEditionButton;
