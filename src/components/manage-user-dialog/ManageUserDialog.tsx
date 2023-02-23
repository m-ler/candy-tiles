import { Avatar, Box, Button, DialogContent, Divider, IconButton, Typography } from '@mui/material';
import Dialog from '../Dialog';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showManageUserDialogState } from './../../store/showManageUserDialog';
import { loggedUserState } from './../../store/loggedUser';
import { Stack } from '@mui/system';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import Tooltip from '../../mui/components/Tooltip';
import { useRef } from 'react';
import useToast from '../../hooks/useToast';
import useUploadAvatar from '../../hooks/useUploadAvatar';

const ManageUserDialog = () => {
	const [showManageUserDialog, setShowManageUserDialog] = useRecoilState(showManageUserDialogState);
	const dialogOnClose = () => setShowManageUserDialog(false);
	const user = useRecoilValue(loggedUserState) as LoggedUserData;
	const avatarImgInputRef = useRef<HTMLInputElement | null>(null);
	const toast = useToast();
	const uploadAvatar = useUploadAvatar();

	const avatarButtonOnClick = () => !!avatarImgInputRef.current && avatarImgInputRef.current.click();
	const onAvatarImgInputChange = () => {
		const file = avatarImgInputRef.current?.files?.[0];
		if (!file) return;
		const validSize = file.size <= 1024 * 1024 * 1;

		if (!validSize) {
			toast({
				message: 'Image size has to be 1MB or less.',
				severity: 'error',
				durationMs: 5000,
			});
			return;
		}

		uploadAvatar.mutate(file);
	};

	return (
		<Dialog open={showManageUserDialog} onClose={dialogOnClose} maxWidth="xs">
			<DialogContent>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2}>
						<Tooltip title="Upload image">
							<Box
								position="relative"
								sx={{
									cursor: 'pointer',
									'& .MuiBox-root': {
										opacity: 0,
									},
									'&:hover .MuiBox-root': {
										opacity: 1,
									},
								}}
							>
								<IconButton onClick={avatarButtonOnClick}>
									<Avatar
										src={user.avatarURL}
										sx={{ width: 72, height: 72, bgcolor: 'tertiary.dark', fontWeight: 'bolder', color: 'white', fontSize: 36 }}
									>
										{user.firstLetter}
									</Avatar>
								</IconButton>

								<Box
									borderRadius="50%"
									position="absolute"
									top={0}
									left={0}
									width="100%"
									height="100%"
									display="flex"
									alignItems="center"
									justifyContent="center"
									sx={{ backgroundColor: 'rgba(0,0,0,0.45)', pointerEvents: 'none' }}
								>
									<MdOutlinePhotoCamera size={38} />
								</Box>
								<input
									type="file"
									className="hidden"
									onChange={onAvatarImgInputChange}
									ref={avatarImgInputRef}
									accept=".png, .jpg, .jpeg"
								></input>
							</Box>
						</Tooltip>

						<Stack justifyContent="center" width="150px" minWidth="50px">
							<Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
								{user.nickname}
							</Typography>
							<Typography variant="caption">{user.email}</Typography>
						</Stack>
					</Stack>
					<Divider />
					<Button variant="outlined" size="small" color="primary" sx={{ marginRight: 'auto' }}>
						Delete account
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default ManageUserDialog;
