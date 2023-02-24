import { useMutation } from 'react-query';
import { validateEmail, validateField } from '../../../utils/form';

const validatePassword = async (value: string): Promise<boolean> => value.length > 0;

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
