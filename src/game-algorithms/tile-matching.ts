import uuid from 'react-uuid';
import { COLUMN_NUMBER, ROW_NUMBER } from '../config';
import LevelItem from '../pages/game/candy-tiles/level-container/level-items/LevelItem';
import { findAllIndeces, getArrayNumberSum, getNumberRangeArray, getNumberSequenceArray } from '../utils/array';
export const CANDY_COLOR_LIST: string[] = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
export const CANDY_TYPES_ARRAY = ['Candy', 'SuperCandy'];
const DEFAULT_SWAPPED_CANDY_COLOR: CandyColor = 'Red';

export const getItemRowIndex = (index: number): number => Math.ceil((index + 1) / COLUMN_NUMBER);
export const getItemColumnIndex = (index: number): number => index + 1 - (getItemRowIndex(index) - 1) * ROW_NUMBER;
const emptyMatchDetail: MatchDetail = {
	index: -1,
	matched: false,
	down: 0,
	left: 0,
	right: 0,
	up: 0,
};

const getAdjacentIndexes = (index: number): number[] => {
	const verticalAdjacentIndexOffsets = [index - COLUMN_NUMBER, index + COLUMN_NUMBER];
	const horizontalAdjacentIndexOffsets = [index + 1, index - 1];

	return [
		...verticalAdjacentIndexOffsets.filter((x) => getItemColumnIndex(x) === getItemColumnIndex(index)),
		...horizontalAdjacentIndexOffsets.filter((x) => getItemRowIndex(x) === getItemRowIndex(index)),
	];
};

export const tilesAreAdjacent = (firstIndex: number, secondIndex: number): boolean => {
	const areAdjacent = getAdjacentIndexes(firstIndex).some((x) => x === secondIndex);
	return areAdjacent;
};

type TileMovePosition = [number, number];

export const getTileTargetPosition = (index: number, tileTargetIndex: number): TileMovePosition => {
	const top = tileTargetIndex === index - ROW_NUMBER ? -100 : tileTargetIndex === index + ROW_NUMBER ? 100 : 0;
	const left = tileTargetIndex === index - 1 ? -100 : tileTargetIndex === index + 1 ? 100 : 0;
	return [top, left];
};

const getCandyMatchings = (
	candy: {
		index: number;
	} & (Candy | SuperCandy),
	items: readonly LevelItem[],
): MatchDetail => {
	const rowIndex = getItemRowIndex(candy.index);
	const columnIndex = getItemColumnIndex(candy.index);

	const leftIterations = columnIndex - 1;
	const upIterations = rowIndex - 1;
	const rightIterations = COLUMN_NUMBER - columnIndex;
	const downIterations = ROW_NUMBER - rowIndex;

	const matchings = {
		'up': {
			count: 0,
			iterations: upIterations,
			getAdjacent: (cycle: number) => candy.index - COLUMN_NUMBER * cycle,
		},
		'right': {
			count: 0,
			iterations: rightIterations,
			getAdjacent: (cycle: number) => candy.index + cycle,
		},
		'down': {
			count: 0,
			iterations: downIterations,
			getAdjacent: (cycle: number) => candy.index + COLUMN_NUMBER * cycle,
		},
		'left': {
			count: 0,
			iterations: leftIterations,
			getAdjacent: (cycle: number) => candy.index - cycle,
		},
	};

	Object.values(matchings).forEach((direction) => {
		for (let i = 1; i < direction.iterations + 1; i++) {
			const adjacentCandy = items[direction.getAdjacent(i)] || null;
			if ((adjacentCandy as Candy)?.color !== candy.color) break;
			direction.count += 1;
		}
	});

	const up = matchings.up.count;
	const right = matchings.right.count;
	const down = matchings.down.count;
	const left = matchings.left.count;
	const matched = (up > 0 && down > 0) || (left > 0 && right > 0) || [up, down, left, right].some((x) => x > 1);

	return {
		index: candy.index,
		matched,
		up,
		right,
		down,
		left,
	};
};

const makeSuperCandyMatch = (
	superCandy: {
		index: number;
	} & SuperCandy,
	items: readonly LevelItem[],
): MatchDetail[] => {
	const matchedIndices: number[] = [];
	const getAllIntersectingItems = (
		superCandy: {
			index: number;
		} & SuperCandy,
		items: readonly LevelItem[],
	): MatchDetail[] => {
		const matchList: MatchDetail[] = [];
		const affectedItems = getHorizontalAndVerticalItems(superCandy.index);
		const candies = affectedItems.filter((x) => items[x]?.type === 'Candy' && !matchedIndices.includes(x));
		const superCandies = affectedItems.filter((x) => items[x]?.type === 'SuperCandy' && !matchedIndices.includes(x));

		candies.forEach((index) => {
			matchedIndices.push(index);
			matchList.push({
				...emptyMatchDetail,
				index,
				matched: true,
			});
		});
		superCandies.forEach((index) => {
			matchedIndices.push(index);
			matchList.push({
				...emptyMatchDetail,
				index,
				matched: true,
			});
			matchList.push(
				...getAllIntersectingItems(
					{
						index,
						...(items[index] as SuperCandy),
					},
					items,
				),
			);
		});

		return matchList;
	};
	const matchList = getAllIntersectingItems(superCandy, items);
	return matchList;
};

const getIceCreamMatchings = (
	iceCream: {
		index: number;
	} & IceCream,
): MatchDetail => {
	return {
		...emptyMatchDetail,
		index: iceCream.index,
		matched: getItemRowIndex(iceCream.index) === ROW_NUMBER,
	};
};

const checkChocolateMatch = (swappedItems: [number, number], items: readonly LevelItem[]): MatchDetail[] => {
	const validMatchItemTypes = ['Candy', 'SuperCandy'];
	const matchList: MatchDetail[] = [];

	const firstItemType = items[swappedItems[0]]?.type || '';
	const secondItemType = items[swappedItems[1]]?.type || '';
	const itemTypes = [firstItemType, secondItemType];

	const validChocolateSwap =
		itemTypes.some((x) => x === 'Chocolate') && itemTypes.some((x) => validMatchItemTypes.includes(x)) && firstItemType !== secondItemType;

	if (!validChocolateSwap) return [];

	const candyColor = (items[swappedItems[0]] as Candy).color || (items[swappedItems[1]] as Candy).color || DEFAULT_SWAPPED_CANDY_COLOR;

	items.forEach(
		(item, index) =>
			(item as Candy)?.color === candyColor &&
			matchList.push({
				...emptyMatchDetail,
				index,
				matched: true,
			}),
	);
	matchList.push(
		{
			...emptyMatchDetail,
			index: swappedItems[0],
			matched: true,
		},
		{
			...emptyMatchDetail,
			index: swappedItems[1],
			matched: true,
		},
	);

	return matchList;
};

const getMatchGroups = (matchList: MatchDetail[], itemsList: readonly LevelItem[]): MatchGroup[] => {
	const matchedCandyList = matchList.filter((x) => x.matched && CANDY_TYPES_ARRAY.includes(itemsList[x.index]?.type || ''));
	if (matchedCandyList.length === 0) return [];

	const getAdjacentsWithSameColor = (group: MatchGroup, index: number) => {
		const color = (itemsList[index] as Candy).color;
		const sameColor = (other: number): boolean => (itemsList[other] as Candy).color === color;
		const adjacentMatches = matchedCandyList.filter(
			(x) => tilesAreAdjacent(index, x.index) && sameColor(x.index) && !group.includes(x.index),
		);

		const adjacents: number[] = adjacentMatches.map((x) => x.index);
		group.push(...adjacents);
		adjacents.forEach((x) => getAdjacentsWithSameColor(group, x));
	};

	const groups: MatchGroup[] = [];
	matchedCandyList.forEach((match) => {
		let currentGroup = groups.findIndex((group) => group.includes(match.index));
		const alreadyInAGroup = currentGroup >= 0;
		if (alreadyInAGroup) return;

		groups.push([match.index]);
		currentGroup = groups.findIndex((group) => group.includes(match.index));
		getAdjacentsWithSameColor(groups[currentGroup], match.index);
	});

	return groups;
};

type ItemListByType = {
	candies: ({
		index: number;
	} & Candy)[];
	superCandies: ({
		index: number;
	} & SuperCandy)[];
	chocolates: ({
		index: number;
	} & Chocolate)[];
	iceCreams: ({
		index: number;
	} & IceCream)[];
};

const getItemsSeparatedByType = (items: readonly LevelItem[]): ItemListByType => {
	const listByType: ItemListByType = {
		candies: [],
		superCandies: [],
		chocolates: [],
		iceCreams: [],
	};

	[...items].forEach((item, index) => {
		switch (item?.type) {
			case 'Candy':
				listByType.candies.push({
					...item,
					index,
				});
				break;
			case 'SuperCandy':
				listByType.superCandies.push({
					...item,
					index,
				});
				break;
			case 'Chocolate':
				listByType.chocolates.push({
					...item,
					index,
				});
				break;
			case 'IceCream':
				listByType.iceCreams.push({
					...item,
					index,
				});
				break;
		}
	});
	return listByType;
};

export const checkForMatchings = (items: readonly LevelItem[], swappedItems?: SwappedItems): MatchResult => {
	const { candies, superCandies, iceCreams } = getItemsSeparatedByType(items);
	const matchingList: MatchDetail[] = [];

	const chocolateMatchList = swappedItems ? checkChocolateMatch(swappedItems as [number, number], items) : [];
	matchingList.push(...chocolateMatchList);

	candies.forEach((candy) => matchingList.push(getCandyMatchings(candy, items)));
	superCandies.forEach((superCandy) => {
		const matchDetail = matchingList.find((x) => x.index === superCandy.index) || getCandyMatchings(superCandy, items);
		matchingList.push(matchDetail);
		matchDetail.matched && matchingList.push(...makeSuperCandyMatch(superCandy, items));
	});
	iceCreams.forEach((iceCream) => matchingList.push(getIceCreamMatchings(iceCream)));
	const matchingGroups = getMatchGroups(matchingList, items);

	return {
		thereWereMatches: matchingList.some((x) => x.matched),
		matchingList,
		matchingGroups,
	};
};

type ItemAbove = {
	index: number | null;
	tileDistanceCount: number;
};

const getItemAbove = (itemIndex: number, items: readonly LevelItem[], tiles: readonly LevelTile[]): ItemAbove => {
	let nextItemIndex = itemIndex - COLUMN_NUMBER;
	let tileDistanceCount = 1;
	let aboveItem: number | null = null;

	while (nextItemIndex > -1) {
		const tileAvaliable = tiles[nextItemIndex] !== null;
		const itemEmtpy = items[nextItemIndex] === null;

		if (!tileAvaliable || itemEmtpy) {
			nextItemIndex -= COLUMN_NUMBER;
			tileDistanceCount += 1;
			continue;
		}

		aboveItem = nextItemIndex;
		break;
	}

	return {
		index: aboveItem,
		tileDistanceCount,
	};
};

export type NewItemPosition = {
	index: number;
	tilesToMove: number;
};

export const repositionItems = (items: readonly LevelItem[], tiles: readonly LevelTile[]): LevelItem[] => {
	const repositionedItems = structuredClone(items) as LevelItem[];
	const newPositions: NewItemPosition[] = [];

	for (let i = repositionedItems.length - 1; i > 0; i--) {
		const tileAvaliable = tiles[i] !== null;
		if (!tileAvaliable) continue;
		const item = repositionedItems[i];

		if (item === null) {
			const itemAbove = getItemAbove(i, repositionedItems, tiles);
			if (itemAbove.index !== null) {
				repositionedItems[i] = structuredClone(repositionedItems[itemAbove.index]);
				repositionedItems[itemAbove.index] = null;
				newPositions.push({
					index: itemAbove.index,
					tilesToMove: itemAbove.tileDistanceCount,
				});
			}
		}
	}
	return repositionedItems;
};

const getRandomColorCandy = (): LevelItem => {
	return {
		color: CANDY_COLOR_LIST[Math.floor(Math.random() * CANDY_COLOR_LIST.length)],
		type: 'Candy',
		id: uuid(),
	} as Candy;
};

export const generateNewCandies = (items: readonly LevelItem[], tiles: readonly LevelTile[]): LevelItem[] => {
	const newCandies = structuredClone(items) as LevelItem[];
	newCandies.forEach((item, index) => {
		const tileAvaliable = tiles[index] !== null;
		if (item === null && tileAvaliable) newCandies[index] = getRandomColorCandy();
	});

	return newCandies;
};

export const getHorizontalAndVerticalItems = (originIndex: number): number[] => {
	const rowIndex = Math.ceil((originIndex + 1) / ROW_NUMBER);
	const columnIndex = originIndex + 1 - (rowIndex - 1) * ROW_NUMBER;

	const horizontalRangeStart = (rowIndex - 1) * COLUMN_NUMBER;
	const horizontalRangeEnd = horizontalRangeStart + (COLUMN_NUMBER - 1);

	const horizontalItems = getNumberRangeArray(horizontalRangeStart, horizontalRangeEnd);
	const verticalItems = getNumberSequenceArray(columnIndex - 1, ROW_NUMBER - 1, COLUMN_NUMBER);

	return [...horizontalItems, ...verticalItems].filter((x) => x !== originIndex);
};

export const allTilesFilled = (items: readonly LevelItem[], tiles: readonly LevelTile[]): boolean => {
	return !(structuredClone(items) as LevelItem[]).some((x, index) => tiles[index] !== null && x === null);
};

export const checkForAdjacentMatch = (index: number, matchList: readonly MatchDetail[]): boolean => {
	const adjacentIndexes = getAdjacentIndexes(index);
	return matchList.some((x) => adjacentIndexes.includes(x.index) && x.matched);
};

const excludeMatchesOutsideGroup = (match: MatchDetail, group: MatchGroup): MatchDetail => {
	const surroundingItemsOffsets = [-ROW_NUMBER, ROW_NUMBER, -1, 1]; //sort: up, down, left, right
	const matchIsInGroup = (index: number): boolean => group.includes(index);
	['up', 'down', 'left', 'right'].forEach((side, index) => {
		const key = side as keyof MatchDetail;
		if (match[key] === 1 && !matchIsInGroup(match.index + surroundingItemsOffsets[index])) (match[key] as number) = 0;
	});
	return match;
};

export const getMatchGroupCenterIndex = (matchGroup: MatchGroup, matchList: MatchDetail[]): number => {
	let matchDetails = matchGroup.map((x) => matchList.find((detail) => detail.index === x) || emptyMatchDetail);
	matchDetails = matchDetails.map((match) => excludeMatchesOutsideGroup(match, matchGroup));

	const adjacentSumsList = matchGroup.map((index) => {
		const match = matchDetails.find((x) => x.index === index) || emptyMatchDetail;
		const adjacentMatches = getArrayNumberSum([match.up, match.down, match.left, match.right]);
		return adjacentMatches;
	});
	const greatestAdjacentSum = Math.max(...adjacentSumsList);
	const greatestAdjacentSumsIndices = findAllIndeces(adjacentSumsList, (sum) => sum === greatestAdjacentSum);

	const matchBalanceList: number[] = matchDetails.map((x) => Math.abs(Math.abs(x.up - x.down) - Math.abs(x.left - x.right)));
	const mostBalancedMatch = Math.min(...matchBalanceList.filter((x, i) => greatestAdjacentSumsIndices.includes(i)));

	const groupCenterIndex = matchGroup.find(
		(x, index) => adjacentSumsList[index] === greatestAdjacentSum && matchBalanceList[index] === mostBalancedMatch,
	);
	return groupCenterIndex || -1;
};

export const matchAllCandiesOfColor = (
	matchList: readonly MatchDetail[],
	itemList: readonly LevelItem[],
	color: CandyColor,
): MatchDetail[] => {
	return matchList.map((matchDetail) => {
		(itemList[matchDetail.index] as Candy).color === color && (matchDetail.matched = true);
		return matchDetail;
	});
};

export const levelHasPossibleCombinations = (itemList: readonly LevelItem[], tileList: readonly LevelTile[]): boolean => {
	const activeChocolateItem = itemList.some((item) => item?.type === 'Chocolate');
	if (activeChocolateItem) return true;

	const interactableTileTypes: string[] = ['Normal', 'Ice'];
	const interactableItemTypes: string[] = ['Candy', 'SuperCandy', 'Chocolate'];
	const interactableTilesIndices = findAllIndeces(tileList, (tile) => interactableTileTypes.includes(tile?.type || ''));
	const interactableItems = [...itemList].map((x, i) =>
		interactableTilesIndices.includes(i) && interactableItemTypes.includes(x?.type || '') ? x : null,
	);

	const possibleCombination = interactableItems.some((item, index) => {
		if (item === null) return false;
		const adjacents = getAdjacentIndexes(index);

		const adjacentSwapMatched = adjacents.some((adjacentIndex) => {
			const adjacentItem = structuredClone(interactableItems[adjacentIndex]);
			const validAdjacentItem = adjacentItem !== null && adjacentIndex > 0 && interactableItemTypes.includes(adjacentItem?.type || '');
			if (!validAdjacentItem) return false;

			const itemListCopy = [...itemList];
			itemListCopy[index] = adjacentItem;
			itemListCopy[adjacentIndex] = item;

			return checkForMatchings(itemListCopy).thereWereMatches;
		});

		return adjacentSwapMatched;
	});

	return possibleCombination;
};
