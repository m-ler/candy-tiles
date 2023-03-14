import { useMutation } from 'react-query';
import { FieldValidation } from '../../../types';
import { validateEmail, validateField } from '../../../utils/form';

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: '',
	},
];

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', (value: string) => validateField(value, emailValidations));

	return {
		emailValidation,
	};
};
