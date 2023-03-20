import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './../../assets/img/app/text-logo.svg';
import SignInButton from './SignInButton';
import AvatarButton from './AvatarButton';
import useLoggedUser from '../../hooks/useLoggedUser';

const Header = () => {
	const loggedUser = useLoggedUser();

	return (
		<header className="flex justify-between p-[16px] items-center">
			<Link to={'/'}>
				<Logo className="min-w-[94px] w-[94px] h-[40px] text-p-light"></Logo>
			</Link>
			{loggedUser ? <AvatarButton user={loggedUser} /> : <SignInButton />}
		</header>
	);
};

export default Header;
