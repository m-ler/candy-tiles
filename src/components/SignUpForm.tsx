import { Button, InputAdornment, Stack } from '@mui/material';
import { MdEmail, MdLock, MdBorderColor } from 'react-icons/md';
import TextFieldMain from '../mui/components/TextFieldMain';

type Props = {
	onRedirect?: () => void;
};

const SignUpForm = ({ onRedirect }: Props) => {
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
				label="Username"
				variant="filled"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MdBorderColor className="max-w-[16px]"></MdBorderColor>
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
			<Stack direction="row" justifyContent="center" alignItems="center">
				<Button variant="contained">Continue</Button>
			</Stack>
		</Stack>
	);
};

export default SignUpForm;
