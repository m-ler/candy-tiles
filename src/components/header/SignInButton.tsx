import { IconButton, Tooltip } from '@mui/material';
import { MdAccountCircle } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { showUserAuthDialogState } from '../../store/showUserAuthenticationDialog';

const SignInButton = () => {
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const signInButtonOnClick = () => setShowUserAuthDialog(true);

	return (
		<Tooltip title="Sign in">
			<IconButton onClick={signInButtonOnClick} sx={{ color: 'primary.light' }}>
				<MdAccountCircle size={32} />
			</IconButton>
		</Tooltip>
	);
};

export default SignInButton;
