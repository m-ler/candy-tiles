import { IceCream } from './../candy-tiles/types/index';
import { describe, expect, it } from 'vitest';
import { Candy, MatchDetail } from '../candy-tiles/types';
import levelItemsSnapshot from './mocks/levelItemsSnapshot';
import {
	getAdjacentIndexes,
	getCandyMatchings,
	getHorizontalAndVerticalItems,
	getIceCreamMatchings,
	getItemColumnIndex,
	getItemRowIndex,
	tilesAreAdjacent,
} from './tile-matching';
import levelTilesSnapshot from './mocks/levelTilesSnapshot';

describe('item row index', () => {
	it('returns row index based on item index', () => {
		const itemIndex = 22;
		const expectedRowIndex = 3;
		const rowIndex = getItemRowIndex(itemIndex);
		expect(rowIndex).toBe(expectedRowIndex);
	});
});

describe('item column index', () => {
	it('returns column index based on item index', () => {
		const itemIndex = 49;
		const expectedColumnIndex = 5;
		const columnIndex = getItemColumnIndex(itemIndex);
		expect(columnIndex).toBe(expectedColumnIndex);
	});
});

describe('adjacent indexes', () => {
	it('returns all adjacent indexes around an item', () => {
		const itemIndex = 39;
		const expectedIndexes = [30, 38, 40, 48];
		const adjacentIndexes = getAdjacentIndexes(itemIndex);
		expect(adjacentIndexes.every((x) => expectedIndexes.includes(x))).toBeTruthy();
	});

	it('returns "true" when comparing adjacent tiles', () => {
		const areAdjacent = tilesAreAdjacent(40, 41);
		expect(areAdjacent).toBeTruthy();
	});

	it('returns "false" when comparing non adjacent tiles', () => {
		const areAdjacent = tilesAreAdjacent(8, 37);
		expect(areAdjacent).toBeFalsy();
	});
});

describe('candy matchings', () => {
	it('returns all matchings on a candy item', () => {
		const candy: Candy & { index: number } = {
			index: 5,
			color: 'Green',
			type: 'Candy',
		};

		const expectedMatchings: MatchDetail = {
			index: candy.index,
			matched: true,
			up: 0,
			right: 1,
			down: 0,
			left: 1,
		};

		const matchings = getCandyMatchings(candy, levelItemsSnapshot);
		expect(JSON.stringify(matchings)).toEqual(JSON.stringify(expectedMatchings));
	});

	it('matches Ice Cream item if it is on the last row', () => {
		const iceCream: IceCream & { index: number } = {
			type: 'IceCream',
			index: 79,
		};

		const { matched } = getIceCreamMatchings(iceCream, levelTilesSnapshot);
		expect(matched).toBeTruthy();
	});
});

it('return all horizontal and vertical items based on an grid index', () => {
	const itemIndex = 12;
	const expected = [3, 9, 10, 11, 13, 14, 15, 16, 17, 21, 30, 39, 48, 57, 66, 75];
	const list = getHorizontalAndVerticalItems(itemIndex);
	expect(list.every((x) => expected.includes(x))).toBeTruthy();
});
