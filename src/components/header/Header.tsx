import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './../../assets/img/app/text-logo.svg';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../../store/loggedUser';
import SignInButton from './SignInButton';
import UserAvatar from './UserAvatar';

const Header = () => {
	const loggedUser = useRecoilValue(loggedUserState);

	return (
		<header className="flex justify-between p-[16px] items-center">
			<Link to={'/'}>
				<Logo className="min-w-[94px] w-[94px] h-[40px] text-p-light"></Logo>
			</Link>
			{!!loggedUser ? <UserAvatar user={loggedUser} /> : <SignInButton />}
		</header>
	);
};

export default Header;
