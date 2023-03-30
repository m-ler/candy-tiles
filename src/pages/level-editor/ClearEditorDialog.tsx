import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRecoilState } from 'recoil';
import useClearLevelEditor from './hooks/useClearLevelEditor';
import { showClearEditorDialogState } from './store/showClearEditorDialog';

const ClearEditorDialog = () => {
	const [showClearEditor, setShowClearEditor] = useRecoilState(showClearEditorDialogState);

	const resetLevelEditor = useClearLevelEditor();
	const onClose = () => setShowClearEditor(false);

	return (
		<Dialog open={showClearEditor} onClose={onClose}>
			<DialogTitle id="alert-dialog-title">Clear level editor?</DialogTitle>
			<DialogContent>
				<DialogContentText>This action will reset all your progress and cannot be undone.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setShowClearEditor(false)}>Cancel</Button>
				<Button
					autoFocus
					color="error"
					variant="contained"
					disableElevation
					onClick={() => {
						resetLevelEditor();
						onClose();
					}}
				>
					Clear
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ClearEditorDialog;
