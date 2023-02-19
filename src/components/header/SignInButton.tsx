import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { showUserAuthDialogState } from '../../store/showUserAuthenticationDialog';

const SignInButton = () => {
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const signInButtonOnClick = () => setShowUserAuthDialog(true);

	return (
		<Button onClick={signInButtonOnClick} variant="contained" sx={{ fontWeight: 'bold' }} disableElevation>
			Sign in
		</Button>
	);
};

export default SignInButton;
