import { Box, CircularProgress, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { MdModeEditOutline, MdOutlineCameraAlt, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import useRemoveAvatar from '../../hooks/useRemoveAvatar';
import useToast from '../../hooks/useToast';
import useUploadAvatar from '../../hooks/useUploadAvatar';
import UserAvatar from '../UserAvatar';

type Props = {
	user: LoggedUserData;
	setUploadingAvatar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarButton = ({ user, setUploadingAvatar }: Props) => {
	const avatarImgInputRef = useRef<HTMLInputElement | null>(null);
	const toast = useToast();
	const uploadAvatar = useUploadAvatar();
	const removeAvatar = useRemoveAvatar();
	const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setUploadingAvatar(uploadAvatar.isLoading);
	}, [uploadAvatar.isLoading]);

	const avatarButtonOnClick = (event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget);
	const uploadAvatarOnClick = () => !!avatarImgInputRef.current && avatarImgInputRef.current.click();
	const removeAvatarOnClick = () => removeAvatar.mutate();

	const onMenuClose = () => setMenuAnchorEl(null);

	const onAvatarImgInputChange = () => {
		const file = avatarImgInputRef.current?.files?.[0];
		if (!file) return;
		const validSize = file.size <= 512 * 512;

		if (!validSize) {
			toast({
				message: 'Image size has to be 512KB or less.',
				severity: 'error',
				durationMs: 5000,
			});
			return;
		}

		uploadAvatar.mutate(file);
	};

	return (
		<>
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
				<UserAvatar size={72} fontSize={36} onClick={avatarButtonOnClick} />
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
					<MdModeEditOutline size={38} />
				</Box>
				<input type="file" className="hidden" onChange={onAvatarImgInputChange} ref={avatarImgInputRef} accept=".png, .jpg, .jpeg"></input>
			</Box>
			<Menu open={!!menuAnchorEl} anchorEl={menuAnchorEl} onClose={onMenuClose}>
				<MenuItem
					onClick={() => {
						uploadAvatarOnClick();
						onMenuClose();
					}}
				>
					<ListItemIcon>
						<MdOutlineCameraAlt size={18} className="min-w-[18px]" />
					</ListItemIcon>
					Upload avatar
				</MenuItem>
				{!!user.profile.avatarURL && (
					<MenuItem onClick={removeAvatarOnClick}>
						<ListItemIcon>
							{removeAvatar.isLoading ? (
								<CircularProgress color="secondary" size={18} />
							) : (
								<MdOutlineRemoveCircleOutline size={18} className="min-w-[18px]" />
							)}
						</ListItemIcon>
						Remove avatar
					</MenuItem>
				)}
			</Menu>
		</>
	);
};

export default AvatarButton;
