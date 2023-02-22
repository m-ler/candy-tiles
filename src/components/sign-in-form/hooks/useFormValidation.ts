import { useMutation } from 'react-query';
import { validateEmail, validateField } from '../../../utils/form';

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: 'Invalid email',
	},
];

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', (value: string) => validateField(value, emailValidations));

	return {
		emailValidation,
	};
};
