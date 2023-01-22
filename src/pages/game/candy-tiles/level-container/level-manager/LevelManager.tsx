import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ANIMATION_TIME_MS } from '../../../../../config';
import { levelList } from '../../../../../data/level-layouts';
import {
	allTilesFilled,
	checkForMatchings,
	generateNewCandies,
	getMatchGroupCenterIndex,
	levelHasPossibleCombinations,
	repositionItems,
} from '../../../../../game-algorithms/tile-matching';
import { levelItemsState } from '../../atoms/levelItems';
import { levelTilesState } from '../../atoms/levelTiles';
import { swappedItemsState } from '../../atoms/swappedItems';
import matchSFX from './../../../../../assets/audio/match.mp3';
import fusionMatchSFX from './../../../../../assets/audio/fusionMatch.mp3';
import { delay } from '../../../../../utils/delay';
import { getLevelItemByFusion } from '../../../../../game-algorithms/candy-fusions';
import { finishedMovingState } from '../../atoms/finishedMoving';
import { matchListState } from '../../atoms/matchList';
import uuid from 'react-uuid';
import { levelMovesState } from '../../atoms/levelMoves';
import { avaliableCombinationsState } from '../../atoms/avaliableCombinations';
import useEffectAfterFirstRender from '../../../../../hooks/useEffectAfterFirstRender';

const matchSound = new Audio(matchSFX);
const fusionMatchSound = new Audio(fusionMatchSFX);

export let comboCount = 0;

const playFusionMatch = () => {
	fusionMatchSound.currentTime = 0;
	fusionMatchSound.play();
};

const applyMatches = (matchInfo: MatchResult, itemList: LevelItem[]): LevelItem[] => {
	const newItemList = structuredClone(itemList) as LevelItem[];
	const matchGroupsCenters = matchInfo.matchingGroups.map((group) => getMatchGroupCenterIndex(group, matchInfo.matchingList));
	matchInfo.matchingList
		.filter((x) => x.matched)
		.forEach((y) => {
			const itemIsAtMatchGroupCenter = matchGroupsCenters.includes(y.index);
			newItemList[y.index] = itemIsAtMatchGroupCenter ? getLevelItemByFusion(y, newItemList[y.index]) : null;
			const itemWasFused = newItemList[y.index] !== null;
			itemWasFused && playFusionMatch();
		});

	return newItemList;
};

const getInitialItems = (selectedLevel: number): LevelItem[] => {
	const initialTiles = levelList[selectedLevel].tiles;
	const initialItems = levelList[selectedLevel].items.map((item, index) => {
		if (initialTiles[index] === null || item === null) return null;
		item.key = uuid();
		return item;
	});

	return initialItems;
};

const playMatchSFX = (): void => {
	matchSound.playbackRate = 1 + comboCount / 10;
	matchSound.currentTime = 0;
	matchSound.play();
	matchSound.preservesPitch = false;
};

const LevelManager = () => {
	const [swappedItems, setSwappedItems] = useRecoilState(swappedItemsState);
	const [levelItems, setLevelItems] = useRecoilState(levelItemsState);
	const [levelTiles, setLevelTiles] = useRecoilState(levelTilesState);
	const setLevelMoves = useSetRecoilState(levelMovesState);
	const [finishedMoving, setFinishedMoving] = useRecoilState(finishedMovingState);
	const setMatchList = useSetRecoilState(matchListState);
	const [avaliableCombinations, setAvaliableCombinations] = useRecoilState(avaliableCombinationsState);

	const itemsWereSwapped = useRef(false);

	useEffect(() => {
		const initialItems = getInitialItems(0);
		setLevelTiles(levelList[0].tiles);
		setLevelItems(initialItems);
		setLevelMoves({ done: 0, total: 300, spendAllMoves: false });
	}, []);

	useEffect(() => swapItems(false), [swappedItems]);
	
	useEffectAfterFirstRender(() => {
		finishedMoving && checkForAvaliableCombinations();
	}, [finishedMoving]);

	const swapItems = (undo: boolean) => {
		if (swappedItems.some((x) => x === null)) return;
		itemsWereSwapped.current = true;

		const firstIndex = swappedItems[0] || -1;
		const secondIndex = swappedItems[1] || -1;

		const firstItem = structuredClone(levelItems[firstIndex]) as LevelItem;
		const secondItem = structuredClone(levelItems[secondIndex]) as LevelItem;

		const newLevelItems = structuredClone(levelItems) as LevelItem[];
		newLevelItems[firstIndex] = undo ? firstItem : secondItem;
		newLevelItems[secondIndex] = undo ? secondItem : firstItem;

		if (undo) {
			setTimeout(() => {
				setSwappedItems([null, null]);
				itemsWereSwapped.current = false;
				setLevelItems(newLevelItems);
			}, ANIMATION_TIME_MS);
			return;
		}

		setLevelItems(newLevelItems);
		setFinishedMoving(false);
		setTimeout(() => checkForMatches(newLevelItems, true), ANIMATION_TIME_MS);
	};

	const checkForMatches = async (itemList: LevelItem[], checkSwap: boolean): Promise<void> => {
		const matchInfo = checkForMatchings(itemList, itemsWereSwapped.current ? swappedItems : undefined);

		if (matchInfo.thereWereMatches || !allTilesFilled(itemList, levelTiles)) {
			itemsWereSwapped.current &&
				setLevelMoves((moves) => ({ done: moves.done + 1, total: moves.total, spendAllMoves: moves.done + 1 >= moves.total }));
			setSwappedItems([null, null]);
			itemsWereSwapped.current = false;
			playMatchSFX();
			comboCount += 1;
			const matchResult = applyMatches(matchInfo, itemList);

			setLevelItems(matchResult);
			setMatchList(matchInfo.matchingList);

			await delay(ANIMATION_TIME_MS);
			const repositionResult = repositionItems(matchResult, levelTiles);
			const fillResult = generateNewCandies(repositionResult, levelTiles);
			setLevelItems(fillResult);
			await delay(ANIMATION_TIME_MS);
			checkForMatches(fillResult, false);
			return;
		}

		const thereAreSwappedItems = swappedItems.every((x) => x !== null);
		thereAreSwappedItems && checkSwap && swapItems(true);

		comboCount = 0;
		setFinishedMoving(true);
	};

	const checkForAvaliableCombinations = () => {
		levelHasPossibleCombinations(levelItems, levelTiles);
		setAvaliableCombinations(true);
	};

	return <></>;
};

export default LevelManager;
