import { FormHelperText, InputAdornment, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TextFieldMain from '../TextFieldMain';
import { MdEmail, MdLock } from 'react-icons/md';
import useFormValidation from './hooks/useFormValidation';
import InputAdornmentLoader from '../InputAdornmentLoader';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import useSignIn from '../../hooks/useSignIn';

type Props = {
	onClose?: () => void;
};

const SignInForm = ({ onClose }: Props) => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const { emailValidation } = useFormValidation();
	const { signInMutation, errorMessage } = useSignIn();

	const emailOnBlur = () => emailValidation.mutate(emailValue);
	const singInOnClick = () => {
		signInMutation.mutate({
			email: emailValue,
			password: passwordValue,
		});
	};

	const validForm = emailValidation.data?.valid && !!passwordValue.length;

	return (
		<form>
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
					helperText={emailValidation.data?.validationMessage}
					error={!emailValidation.data?.valid && emailValidation.isSuccess}
					onChange={(e) => setEmailValue(e.target.value)}
					onBlur={emailOnBlur}
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
					onChange={(e) => setPasswordValue(e.target.value)}
				></TextFieldMain>
				<FormHelperText error hidden={!signInMutation.data?.error}>
					{errorMessage}
				</FormHelperText>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Link to="/recover-password" component={RouterLink} fontSize="14px"  onClick={() => onClose?.()}>
						Forgot your password?
					</Link>
					<LoadingButton variant="contained" onClick={singInOnClick} disabled={!validForm} loading={signInMutation.isLoading} type='submit'>
						<span>SIGN IN</span>
					</LoadingButton>
				</Stack>
			</Stack>
		</form>
	);
};

export default SignInForm;
