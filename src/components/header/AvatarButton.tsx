import { useState } from 'react';
import Tooltip from '../../mui/components/Tooltip';
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
			<Tooltip title={user.profile.nickname}>
				<div>
					<UserAvatar size={40} fontSize={18} onClick={handleClick} />
				</div>
			</Tooltip>
			<UserMenu anchorEl={menuAnchorEl} user={user} onMenuClose={() => setMenuAnchorEl(null)} />
		</>
	);
};

export default AvatarButton;
