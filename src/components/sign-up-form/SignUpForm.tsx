import { FormHelperText, InputAdornment, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdEmail, MdLock, MdBorderColor } from 'react-icons/md';
import TextFieldMain from '../../mui/components/TextFieldMain';
import InputAdornmentLoader from '../InputAdornmentLoader';
import useFormValidation from './hooks/useFormValidation';
import LoadingButton from '@mui/lab/LoadingButton';
import useCreateUser from '../../hooks/useCreateUser';

type Props = {
	onClose?: () => void;
};

const SignUpForm = ({ onClose }: Props) => {
	const { emailValidation, usernameValidation, passwordValidation } = useFormValidation();
	const [emailValue, setEmailValue] = useState('');
	const [usernameValue, setUsernameValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const { createUserMutation, errorMessage } = useCreateUser(() => onClose?.());

	const emailOnBlur = () => emailValidation.mutate(emailValue.trim());
	const usernameOnBlur = () => usernameValidation.mutate(usernameValue.trim());
	const passwordOnBlur = () => passwordValidation.mutate(passwordValue.trim());

	const createOnClick = () => {
		createUserMutation.mutate({
			email: emailValue.trim(),
			nickname: usernameValue.trim(),
			password: passwordValue.trim(),
		});
	};

	const validForm = [emailValidation, usernameValidation, passwordValidation].every((x) => x.data?.valid);

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
					label="Username"
					variant="filled"
					helperText={usernameValidation.data?.validationMessage}
					error={!usernameValidation.data?.valid && usernameValidation.isSuccess}
					onBlur={usernameOnBlur}
					onChange={(e) => setUsernameValue(e.target.value)}
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
					helperText={passwordValidation.data?.validationMessage}
					error={!passwordValidation.data?.valid && passwordValidation.isSuccess}
					onBlur={passwordOnBlur}
					onChange={(e) => {setPasswordValue(e.target.value) }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<MdLock className="max-w-[16px]"></MdLock>
							</InputAdornment>
						),
					}}
				></TextFieldMain>
				<FormHelperText error hidden={!createUserMutation.data?.error || !createUserMutation.error}>
					{errorMessage}
				</FormHelperText>
				<Stack direction="row" justifyContent="center" alignItems="center">
					<LoadingButton
						variant="contained"
						onClick={createOnClick}
						disabled={!validForm}
						loading={createUserMutation.isLoading}
						type="submit"
					>
						<span>SIGN UP</span>
					</LoadingButton>
				</Stack>
			</Stack>
		</form>
	);
};

export default SignUpForm;
