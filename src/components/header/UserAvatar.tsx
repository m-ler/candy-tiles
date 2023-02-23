import { Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import UserMenu from './UserMenu';

type Props = {
	user: LoggedUserData;
};

const UserAvatar = ({ user }: Props) => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<Avatar src={user.avatarURL} sx={{ bgcolor: 'tertiary.dark', fontWeight: 'bolder', color: 'white' }}>
					{user.firstLetter}
				</Avatar>
			</IconButton>
			<UserMenu anchorEl={menuAnchorEl} user={user} onMenuClose={() => setMenuAnchorEl(null)} />
		</>
	);
};

export default UserAvatar;
