import { expect, it } from 'vitest';
import { findAllIndeces, getArrayNumberSum, getNumberRangeArray, getNumberSequenceArray } from './array';

it('returns a number range array from start to end parameters', () => {
	const start = 1;
	const end = 5;
	const expected = [1, 2, 3, 4, 5];
	const numberRange = getNumberRangeArray(start, end);
	expect(JSON.stringify(numberRange)).toEqual(JSON.stringify(expected));
});

it('returns a number sequence array depending on start, end and length parameters', () => {
	const start = 0;
	const length = 5;
	const distance = 10;
	const expected = [start, 10, 20, 30, 40, 50];
	const numberRange = getNumberSequenceArray(start, length, distance);
	expect(JSON.stringify(numberRange)).toEqual(JSON.stringify(expected));
});

it('returns total sum from all numbers in an array', () => {
	const numbers = [1, 3, 4, 6];
	const expected = 14;
	const sum = getArrayNumberSum(numbers);
	expect(sum).toEqual(expected);
});

it('returns all indexes from an array that matches the predicate', () => {
	const numbers = [1, 3, 1, 6, 1, 1, 5, 6, 1];
	const expected = [0, 2, 4, 5, 8];
	const indexes = findAllIndeces(numbers, (x) => x === 1);
	expect(JSON.stringify(indexes)).toEqual(JSON.stringify(expected));
});
