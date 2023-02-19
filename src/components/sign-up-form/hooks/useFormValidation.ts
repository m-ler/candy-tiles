import { useMutation } from 'react-query';
import regularExpressions from '../../../utils/regularExpressions';
import { findAsync } from './../../../utils/array';

type ValidationFunction = (value: string) => boolean | Promise<boolean>;

type ValidationResult = {
	validate: ValidationFunction;
	failReason: string;
};

const validateEmailString: ValidationFunction = (value: string) => regularExpressions.validEmail.test(value);
const validateDuplicatedEmail: ValidationFunction = (value: string) => new Promise((resolve) => setTimeout(() => resolve(false), 1000));

const emailValidations: ValidationResult[] = [
	{
		validate: validateEmailString,
		failReason: 'Invalid email',
	},
	{
		validate: validateDuplicatedEmail,
		failReason: 'Email is taken',
	},
];

const validateEmail = async (value: string): Promise<FormFieldValidation> => {
	const errorMessage = (await findAsync(emailValidations, async (x) => !(await x.validate(value))))?.failReason;

	return {
		valid: !errorMessage,
		messages: errorMessage ? [errorMessage] : [],
	};
};

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', validateEmail, {});

	return {
		emailValidation,
	};
};
