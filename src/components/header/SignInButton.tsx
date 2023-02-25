import { Button, IconButton } from '@mui/material';
import { MdAccountCircle } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import Tooltip from '../../mui/components/Tooltip';
import { showUserAuthDialogState } from '../../store/showUserAuthenticationDialog';

const SignInButton = () => {
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const signInButtonOnClick = () => setShowUserAuthDialog(true);

	return (
		<Tooltip title="Sign in">
			<IconButton onClick={signInButtonOnClick}>
				<MdAccountCircle size={32}/>
			</IconButton>
		</Tooltip>
	);
};

export default SignInButton;
