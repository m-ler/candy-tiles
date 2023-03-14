import { LoadingButton } from '@mui/lab';
import { Container, FormHelperText, InputAdornment, Slide, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { MdLock } from 'react-icons/md';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import InputAdornmentLoader from '../../components/InputAdornmentLoader';
import TextFieldMain from '../../components/TextFieldMain';
import useFormValidations from './hooks/useFormValidations';
import useToast from '../../hooks/useToast';
import { UserResponse } from '@supabase/supabase-js';

const errorMessages = {
	'AuthSessionMissingError': 'User not authenticated.',
	'default': 'An error occurred. Please try resetting the password with a new link.',
} as { [key: string]: string };

const ResetPasswordPage = () => {
	const [newPasswordValue, setNewPasswordValue] = useState('');
	const { newPasswordValidation } = useFormValidations();
	const navigate = useNavigate();
	const toast = useToast();
	const resetPasswordMutation = useMutation<UserResponse>('reset-password', () => resetPassword(newPasswordValue));

	useEffect(() => {
		resetPasswordMutation.isSuccess && !resetPasswordMutation.data.error && onPasswordReset();
	}, [resetPasswordMutation.isSuccess]);

	const onPasswordReset = () => {
		toast({ message: 'Password updated successfully.', severity: 'success', durationMs: 5000 });
		navigate('/levels');
	};

	const newPasswordOnBlue = () => newPasswordValidation.mutate(newPasswordValue);
	const resetOnClick = () => resetPasswordMutation.mutate();

	const errorMessage = errorMessages[resetPasswordMutation.data?.error?.name || ''] || errorMessages['default'];

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
								<InputAdornment position="start">
									{resetPasswordMutation.isLoading ? <InputAdornmentLoader /> : <MdLock className="max-w-[16px]" />}
								</InputAdornment>
							),
						}}
						onChange={(e) => setNewPasswordValue(e.target.value)}
						onBlur={newPasswordOnBlue}
						helperText={newPasswordValidation.data?.validationMessage}
						error={!newPasswordValidation.data?.valid && newPasswordValidation.isSuccess}
					></TextFieldMain>
					<FormHelperText error hidden={!resetPasswordMutation.data?.error && !resetPasswordMutation.isError}>
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

export default ResetPasswordPage;
