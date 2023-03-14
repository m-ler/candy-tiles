import { useMutation } from 'react-query';
import { FieldValidation } from '../../../types';
import { validateField } from '../../../utils/form';

const validatePassword = (value: string) => value.length >= 6;

const newPasswordValidations: FieldValidation<string>[] = [
	{
		validate: validatePassword,
		failReason: 'Password must contain at least 6 characters',
	},
];

export default () => {
	const newPasswordValidation = useMutation('passWordValidation', (value: string) => validateField(value, newPasswordValidations));

	return {
		newPasswordValidation,
	};
};
