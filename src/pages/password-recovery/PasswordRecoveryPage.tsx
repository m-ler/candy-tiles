import { LoadingButton } from '@mui/lab';
import { Container, FormHelperText, InputAdornment, Slide, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { useMutation } from 'react-query';
import { sendPaswordRecovery } from '../../api/auth';
import InputAdornmentLoader from '../../components/InputAdornmentLoader';
import TextFieldMain from '../../components/TextFieldMain';
import useFormValidations from './hooks/useFormValidations';

const errorMessages = {
	'auth/invalid-email': 'That email does not belong to any account.',
	'default': "We couldn't send a verification email. Please try again later.",
} as { [key: string]: string };

const PasswordRecoveryPage = () => {
	const [emailValue, setEmailValue] = useState('');
	const { emailValidation } = useFormValidations();
	const sendRecovery = useMutation('send-recovery', () => sendPaswordRecovery(emailValue));

	const emailOnBlur = () => emailValidation.mutate(emailValue);
	const sendOnClick = () => sendRecovery.mutate();

	const errorMessage = errorMessages[''] || errorMessages['default'];

	return (
		<Slide direction="down" in={true} mountOnEnter unmountOnExit>
			<Container maxWidth="xs">
				<form>
					<Stack spacing={2} mt={4}>
						<Typography variant="h1" color="primary.light" fontWeight="500" fontSize="2rem">
							Password recovery
						</Typography>
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
							onChange={(e) => setEmailValue(e.target.value)}
							onBlur={emailOnBlur}
							helperText={emailValidation.data?.validationMessage}
							error={!emailValidation.data?.valid && emailValidation.isSuccess}
						></TextFieldMain>
						<FormHelperText error hidden={!sendRecovery.isError}>
							{errorMessage}
						</FormHelperText>
						<FormHelperText sx={{ color: 'success.light' }} hidden={!sendRecovery.isSuccess}>
							We sent an email with a password-reset link.
						</FormHelperText>
						<LoadingButton
							variant="contained"
							disableElevation
							sx={{ '&&': { marginLeft: 'auto' } }}
							disabled={!emailValidation.data?.valid}
							loading={sendRecovery.isLoading}
							type="submit"
							onClick={sendOnClick}
						>
							Send
						</LoadingButton>
					</Stack>
				</form>
			</Container>
		</Slide>
	);
};

export default PasswordRecoveryPage;
