import { Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import UserAvatar from '../UserAvatar';
import UserMenu from './UserMenu';

type Props = {
	user: LoggedUserData;
};

const AvatarButton = ({ user }: Props) => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	return (
		<>
			<UserAvatar size={40} fontSize={18} onClick={handleClick} />
			<UserMenu anchorEl={menuAnchorEl} user={user} onMenuClose={() => setMenuAnchorEl(null)} />
		</>
	);
};

export default AvatarButton;
