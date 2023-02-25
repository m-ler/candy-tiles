import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { findAsync } from './array';
import regularExpressions from './regularExpressions';

export const validateEmail = (value: string) => regularExpressions.validEmail.test(value.trim());

export const validateDuplicatedEmail = async (value: string): Promise<boolean> => {
	const q = query(collection(db, 'users'), where('email', '==', value.trim()));
	const response = await getDocs(q);
	return response.empty;
};

export const validateField = async <T>(fieldValue: T, validations: FieldValidation<T>[]): Promise<FieldValidationResult> => {
	const failedValidation = await findAsync(validations, async (x) => !(await x.validate(fieldValue)));
	const errorMessage = failedValidation?.failReason;

	return {
		valid: !failedValidation,
		validationMessage: errorMessage ? errorMessage : '',
	};
};
