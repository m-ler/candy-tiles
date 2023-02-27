import { useMutation } from 'react-query';
import { supabase } from '../../../config/supabase-config';
import { validateDuplicatedEmail, validateEmail, validateField } from './../../../utils/form';

const validatePasswordLength = (value: string) => value.length > 5;

const validateUsernameLength = (value: string) => value.length < 50;
const validateDuplicatedUsername = async (value: string) => {
	const { data } = await supabase.from('users').select('nickname').eq('nickname', value);
	return (data || []).length === 0;
};

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: 'Invalid email',
	},
	{
		validate: validateDuplicatedEmail,
		failReason: 'That email is taken. Please try another.',
	},
];

const passwordValidations: FieldValidation<string>[] = [
	{
		validate: validatePasswordLength,
		failReason: 'Password must contain at least 6 characters',
	},
];

const usernameValidations: FieldValidation<string>[] = [
	{
		validate: validateUsernameLength,
		failReason: 'User name must contain 50 characters at much.',
	},
	{
		validate: validateDuplicatedUsername,
		failReason: 'That username is taken. Please try another.',
	},
];

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', (value: string) => validateField(value, emailValidations));
	const usernameValidation = useMutation('signUpUsernameValidation', (value: string) => validateField(value, usernameValidations));
	const passwordValidation = useMutation('signUpPasswordValidation', (value: string) => validateField(value, passwordValidations));

	return {
		emailValidation,
		usernameValidation,
		passwordValidation,
	};
};
