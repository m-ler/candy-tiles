import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './../assets/img/app/text-logo.svg';
import { useSetRecoilState } from 'recoil';
import { showUserAuthDialogState } from './../store/showUserAuthenticationDialog';

const Header = () => {
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const signInButtonOnClick = () => setShowUserAuthDialog(true);

	return (
		<header className="flex justify-between p-[16px] items-center">
			<Link to={'/'}>
				<Logo className="min-w-[94px] w-[94px] h-[40px] text-p-light"></Logo>
			</Link>
			<Button onClick={signInButtonOnClick} variant="contained" sx={{ fontWeight: 'bold' }} disableElevation>
				Sign in
			</Button>
		</header>
	);
};

export default Header;
