import { useMutation } from 'react-query';
import { FieldValidation } from '../../../types';
import { validateDuplicatedEmail, validateEmail, validateField } from '../../../utils/form';

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: 'Invalid email',
	},
	{
		validate: async (value): Promise<boolean> => !(await validateDuplicatedEmail(value)),
		failReason: 'That email does not belong to any account.',
	},
];

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', (value: string) => validateField(value, emailValidations));

	return {
		emailValidation,
	};
};
