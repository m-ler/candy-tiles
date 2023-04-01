import { Divider, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { MdLogout } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import useSignOut from '../../hooks/useSignOut';
import { showManageUserDialogState } from '../../store/showManageUserDialog';
import { LoggedUserData } from '../../types';
import UserAvatar from '../UserAvatar';

type Props = {
	anchorEl: HTMLElement | null;
	user: LoggedUserData;
	onMenuClose?: () => void;
};

const UserMenu = ({ anchorEl, user, onMenuClose }: Props) => {
	const signOut = useSignOut();
	const setShowManageUserDialog = useSetRecoilState(showManageUserDialogState);
	const open = !!anchorEl;

	return (
		<Menu open={open} anchorEl={anchorEl} onClose={() => onMenuClose?.()} elevation={4} data-cy="user-avatar-menu">
			<MenuItem
				onClick={() => {
					setShowManageUserDialog(true);
					onMenuClose?.();
				}}
			>
				<Stack direction="row" spacing={2}>
					<UserAvatar size={56} fontSize={28} />
					<Stack justifyContent="center">
						<Typography variant="subtitle1" color={blueGrey[800]} sx={{ fontWeight: 'bolder' }}>
							{user.profile.nickname}
						</Typography>
						<Typography variant="caption" fontSize="0.75rem" color={blueGrey[500]}>
							{user.profile.email}
						</Typography>
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
	);
};

export default UserMenu;
