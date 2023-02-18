import { Button, InputAdornment, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TextFieldMain from '../mui/components/TextFieldMain';
import { MdEmail, MdLock } from 'react-icons/md';

type Props = {
	onRedirect?: () => void;
};

const SignInForm = ({ onRedirect }: Props) => {
	return (
		<Stack spacing={2}>
			<TextFieldMain
				label="Email"
				variant="filled"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MdEmail className="max-w-[16px]"></MdEmail>
						</InputAdornment>
					),
				}}
			></TextFieldMain>
			<TextFieldMain
				label="Password"
				variant="filled"
				type="password"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MdLock className="max-w-[16px]"></MdLock>
						</InputAdornment>
					),
				}}
			></TextFieldMain>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Link to="/recover-password" component={RouterLink} fontSize="14px" color="secondary" onClick={() => onRedirect?.()}>
					Forgot your password?
				</Link>
				<Button variant="contained">Sign In</Button>
			</Stack>
		</Stack>
	);
};

export default SignInForm;
