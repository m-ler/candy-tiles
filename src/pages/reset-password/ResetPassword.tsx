import { LoadingButton } from '@mui/lab';
import { Container, FormHelperText, InputAdornment, Slide, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { MdLock } from 'react-icons/md';
import { useMutation } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import InputAdornmentLoader from '../../components/InputAdornmentLoader';
import TextFieldMain from '../../mui/components/TextFieldMain';
import useFormValidations from './hooks/useFormValidations';
import { FirebaseError } from 'firebase/app';
import useToast from '../../hooks/useToast';

const errorMessages = {
	'auth/expired-action-code': 'Link is expired. Please try resetting the password with a new link.',
	'auth/invalid-action-code': 'Link is invalid. Please try resetting the password with a new link.',
	'auth/user-disabled': 'Cannot reset your password at this time because your account has been disabled.',
	'auth/weak-password': 'Your new password is too weak. Please choose a password that is at least 6 characters long.',
	'default': 'An error occurred. Please try resetting the password with a new link.',
} as { [key: string]: string };

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const [newPasswordValue, setNewPasswordValue] = useState('');
	const { newPasswordValidation } = useFormValidations();
	const navigate = useNavigate();
	const toast = useToast();
	const actionCode = searchParams.get('oobCode') || '';
	const resetPasswordMutation = useMutation<unknown, FirebaseError>('reset-password', () => resetPassword(actionCode, newPasswordValue));

	useEffect(() => {
		resetPasswordMutation.isSuccess && onPasswordReset();
	}, [resetPasswordMutation.isSuccess]);

	const onPasswordReset = () => {
		toast({ message: 'Password updated successfully.', severity: 'success', durationMs: 5000 });
		navigate('/');
	};

	const newPasswordOnBlue = () => newPasswordValidation.mutate(newPasswordValue);
	const resetOnClick = () => resetPasswordMutation.mutate();

	const errorMessage = errorMessages[resetPasswordMutation.error?.code || ''] || errorMessages['default'];

	return (
		<Slide direction="down" in={true} mountOnEnter unmountOnExit>
			<Container maxWidth="xs">
				<Stack spacing={2}>
					<Typography variant="h1" color="primary.light" sx={{ fontSize: '2rem', fontFamily: 'YellowCandy' }}>
						Reset password
					</Typography>
					<TextFieldMain
						label="New password"
						type="password"
						variant="filled"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">{false ? <InputAdornmentLoader /> : <MdLock className="max-w-[16px]" />}</InputAdornment>
							),
						}}
						onChange={(e) => setNewPasswordValue(e.target.value)}
						onBlur={newPasswordOnBlue}
						helperText={newPasswordValidation.data?.validationMessage}
						error={!newPasswordValidation.data?.valid && newPasswordValidation.isSuccess}
					></TextFieldMain>
					<FormHelperText error hidden={!resetPasswordMutation.isError}>
						{errorMessage}
					</FormHelperText>
					<LoadingButton
						variant="contained"
						disableElevation
						sx={{ '&&': { marginLeft: 'auto' } }}
						loading={resetPasswordMutation.isLoading}
						disabled={!newPasswordValidation.data?.valid}
						onClick={resetOnClick}
					>
						Reset
					</LoadingButton>
				</Stack>
			</Container>
		</Slide>
	);
};

export default ResetPassword;
