import { Avatar, IconButton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../store/loggedUser';

type Props = {
	size: number;
	fontSize: number;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const UserAvatar = ({ size, fontSize, onClick }: Props) => {
	const user = useRecoilValue(loggedUserState) as LoggedUserData;

	return (
		<IconButton onClick={onClick}>
			<Avatar
				src={user.profile.avatarURL}
				sx={{
					width: size,
					height: size,
					background: 'linear-gradient(45deg, #28c9d4, #EA915F)',
					fontWeight: 'bolder',
					color: 'white',
					fontSize,
				}}
			>
				{user.profile.firstLetter}
			</Avatar>
		</IconButton>
	);
};

export default UserAvatar;
