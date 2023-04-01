import { Avatar, IconButton } from '@mui/material';
import useLoggedUser from '../hooks/useLoggedUser';
import { LoggedUserData } from '../types';

type Props = {
	size: number;
	fontSize: number;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const UserAvatar = ({ size, fontSize, onClick }: Props) => {
	const user = useLoggedUser() as LoggedUserData;

	return (
		<IconButton onClick={onClick}>
			<Avatar
				src={user.profile.avatarURL}
				sx={{
					width: size,
					height: size,
					fontSize,
				}}
			>
				{user.profile.firstLetter}
			</Avatar>
		</IconButton>
	);
};

export default UserAvatar;
