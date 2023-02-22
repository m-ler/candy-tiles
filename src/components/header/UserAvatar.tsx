import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import useSignOut from '../../hooks/useSignOut';

type Props = {
	user: LoggedUserData;
};

const UserAvatar = ({ user }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const signOut = useSignOut();
	const open = !!anchorEl;

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const userInitialLetter = (user.nickname || ' ')[0].toUpperCase();

	return (
		<>
			<IconButton onClick={handleClick}>
				<Avatar sx={{ bgcolor: 'tertiary.dark', fontWeight: 'bolder', color: 'white' }}>{userInitialLetter}</Avatar>
			</IconButton>
			<Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
				<MenuItem>
					<Stack direction="row" spacing={2}>
						<Avatar sx={{ width: 56, height: 56, bgcolor: 'tertiary.dark', fontWeight: 'bolder', color: 'white' }}>
							{userInitialLetter}
						</Avatar>
						<Stack justifyContent="center">
							<Typography variant="subtitle1">{user.nickname}</Typography>
							<Typography variant="caption">{user.email}</Typography>
						</Stack>
					</Stack>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => signOut.mutate()}>
					<ListItemIcon>
						<MdLogout size={18} className="min-w-[18px]" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserAvatar;
