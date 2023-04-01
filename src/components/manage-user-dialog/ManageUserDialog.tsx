import { Button, Dialog, DialogContent, Divider, LinearProgress, Typography } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showManageUserDialogState } from './../../store/showManageUserDialog';
import { Stack } from '@mui/system';
import AvatarButton from './AvatarButton';
import { useState } from 'react';
import { showDeleteAccountDialogState } from './../../store/showDeleteAccountDialog';
import { blueGrey } from '@mui/material/colors';
import { LoggedUserData } from '../../types';
import useLoggedUser from '../../hooks/useLoggedUser';

const ManageUserDialog = () => {
	const [showManageUserDialog, setShowManageUserDialog] = useRecoilState(showManageUserDialogState);
	const setShowDeleteAccountDialog = useSetRecoilState(showDeleteAccountDialogState);

	const dialogOnClose = () => setShowManageUserDialog(false);
	const user = useLoggedUser() as LoggedUserData;
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const onDeleteAccountClick = () => {
		setShowDeleteAccountDialog(true);
		dialogOnClose();
	};

	return (
		<Dialog open={showManageUserDialog} onClose={dialogOnClose} maxWidth="xs" data-cy="manage-user-dialog">
			<DialogContent>
				<Stack spacing={2}>
					{uploadingAvatar && <LinearProgress />}
					<Stack direction="row" spacing={2}>
						<AvatarButton user={user} setUploadingAvatar={setUploadingAvatar} />

						<Stack justifyContent="center">
							<Typography variant="h6" lineHeight="1.35rem" sx={{ fontWeight: 'bolder' }} color={blueGrey[800]}>
								{user.profile.nickname}
							</Typography>
							<Typography variant="caption" marginTop="0.5rem" color={blueGrey[500]}>
								{user.profile.email}
							</Typography>
						</Stack>
					</Stack>
					<Divider />
					<Button variant="outlined" size="small" color="primary" sx={{ marginRight: 'auto' }} onClick={onDeleteAccountClick}>
						Delete account
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default ManageUserDialog;
