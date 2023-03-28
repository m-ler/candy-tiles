import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useMutation } from 'react-query';
import { deleteLevel } from '../../../api/levels';
import useToast from '../../../hooks/useToast';
import { LevelWithUserDB } from '../../../types/database-aliases';

type Props = {
	level: LevelWithUserDB | null;
	setLevel: (value: LevelWithUserDB | null) => void;
	onLevelDeleted?: () => void;
};

const DeleteLevelDialog = ({ level, setLevel, onLevelDeleted }: Props) => {
	const onClose = () => setLevel(null);
	const toast = useToast();

	const onDeleteLevelFailed = () => toast({ message: 'Something went wrong. Please try again.', severity: 'error', durationMs: 3000 });
	const onDeleteLevelSuccess = () => {
		toast({ message: 'Level deleted.', severity: 'success', durationMs: 3000 });
		setLevel(null);
		onLevelDeleted?.();
	};
	const deleteLevelMutation = useMutation(() => deleteLevel(level?.id || 0), {
		onError: onDeleteLevelFailed,
		onSuccess: (data) => (data.error ? onDeleteLevelFailed() : onDeleteLevelSuccess()),
	});

	return (
		<Dialog open={!!level} onClose={onClose} data-cy="delete-level-dialog">
			<DialogTitle>Delete {`'${level?.title || ''}'`}</DialogTitle>
			<DialogContent>
				<DialogContentText>This level will be permanently deleted. This action cannot be undone. </DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<LoadingButton
					autoFocus
					color="error"
					variant="contained"
					disableElevation
					loading={deleteLevelMutation.isLoading}
					onClick={() => deleteLevelMutation.mutate()}
				>
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteLevelDialog;
