import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogTitle, FormHelperText, InputAdornment, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { MdLock } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import useDeleteAccount from '../../hooks/useDeleteAccount';
import TextFieldMain from '../TextFieldMain';
import InputAdornmentLoader from '../InputAdornmentLoader';
import { showDeleteAccountDialogState } from './../../store/showDeleteAccountDialog';
import useLoggedUser from '../../hooks/useLoggedUser';

const DeleteAccountDialog = () => {
	const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useRecoilState(showDeleteAccountDialogState);
	const [passwordValue, setPasswordValue] = useState('');
	const { deleteAccountMutation, errorMessage } = useDeleteAccount();
	const loggedUser = useLoggedUser();

	useEffect(() => {
		deleteAccountMutation.isSuccess && !deleteAccountMutation.data?.error && setShowDeleteAccountDialog(false);
	}, [deleteAccountMutation.isSuccess]);

	const dialogOnClose = () => setShowDeleteAccountDialog(false);
	const passwordOnBlur = () => false;
	const deleteOnClick = () =>
		deleteAccountMutation.mutate({
			id: loggedUser?.auth.id || '',
			email: loggedUser?.auth.email || '',
			password: passwordValue,
		});

	return (
		<Dialog open={showDeleteAccountDialog} onClose={dialogOnClose} fullWidth maxWidth="xs">
			<DialogTitle>Delete account</DialogTitle>
			<DialogContent>
				<form>
					<Stack spacing={2} alignItems="flex-start">
						<TextFieldMain
							label="Confirm password"
							type="password"
							variant="filled"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{deleteAccountMutation.isLoading ? <InputAdornmentLoader /> : <MdLock className="max-w-[16px]"></MdLock>}
									</InputAdornment>
								),
							}}
							helperText={''}
							error={deleteAccountMutation.isError}
							onChange={(e) => setPasswordValue(e.target.value)}
							onBlur={passwordOnBlur}
						></TextFieldMain>
						<FormHelperText error hidden={!deleteAccountMutation.data?.error && !deleteAccountMutation.isError}>
							{errorMessage}
						</FormHelperText>
						<LoadingButton
							loading={deleteAccountMutation.isLoading}
							variant="contained"
							color="error"
							disabled={passwordValue.length === 0}
							disableElevation
							onClick={deleteOnClick}
							type="submit"
							sx={{
								'&&': {
									marginLeft: 'auto',
								},
							}}
						>
							Delete
						</LoadingButton>
					</Stack>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteAccountDialog;
