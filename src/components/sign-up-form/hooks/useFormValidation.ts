import { useMutation } from 'react-query';
import regularExpressions from '../../../utils/regularExpressions';
import { validateField } from './../../../utils/form';

const validateEmail = (value: string) => regularExpressions.validEmail.test(value);
const validateDuplicatedEmail = (value: string): Promise<boolean> => new Promise((resolve) => setTimeout(() => resolve(true), 1000));

const validatePasswordLength = (value: string) => value.length > 5;

const validateUsernameLength = (value: string) => value.length < 50;

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: 'Invalid email',
	},
	{
		validate: validateDuplicatedEmail,
		failReason: 'Email is taken',
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
