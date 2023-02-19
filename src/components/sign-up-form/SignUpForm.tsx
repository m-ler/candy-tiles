import { Button, CircularProgress, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { MdEmail, MdLock, MdBorderColor } from 'react-icons/md';
import TextFieldMain from '../../mui/components/TextFieldMain';
import InputAdornmentLoader from '../InputAdornmentLoader';
import useFormValidation from './hooks/useFormValidation';

type Props = {
	onRedirect?: () => void;
};

const SignUpForm = ({ onRedirect }: Props) => {
	const { emailValidation } = useFormValidation();
	const [emailValue, setEmailValue] = useState('');

	const emailOnBlur = () => emailValidation.mutate(emailValue);

	return (
		<Stack spacing={2}>
			<TextFieldMain
				label="Email"
				variant="filled"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{emailValidation.isLoading ? <InputAdornmentLoader /> : <MdEmail className="max-w-[16px]"></MdEmail>}
						</InputAdornment>
					),
				}}
				helperText={emailValidation.data?.messages[0] || ''}
				error={!emailValidation.data?.valid && emailValidation.isSuccess}
				onChange={(e) => setEmailValue(e.target.value)}
				onBlur={emailOnBlur}
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
				helperText=""
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
