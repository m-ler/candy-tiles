import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ANIMATION_TIME_MS, COMBO_LIMIT } from '../../../../../config';
import {
	allTilesFilled,
	checkForMatchings,
	generateNewCandies,
	getMatchGroupCenterIndex,
	levelHasPossibleCombinations,
	repositionItems,
} from '../../../../../game-algorithms/tile-matching';
import { levelItemsState } from '../../store/levelItems';
import { levelTilesState } from '../../store/levelTiles';
import { swappedItemsState } from '../../store/swappedItems';
import { getLevelItemByFusion } from '../../../../../game-algorithms/candy-fusions';
import { finishedMovingState } from '../../store/finishedMoving';
import { matchListState } from '../../store/matchList';
import uuid from 'react-uuid';
import { levelMovesState } from '../../store/levelMoves';
import { possibleCombinationsState } from '../../store/possibleCombinations';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import useSelectedLevel from '../../../../../hooks/useSelectedLevel';
import useAudio from '../../../../../hooks/useAudio';
import { delay } from '../../../../../utils/delay';
import { comboCountState } from './../../store/comboCount';

const applyMatches = (matchInfo: MatchResult, itemList: LevelItem[]): LevelItem[] => {
	const newItemList = structuredClone(itemList) as LevelItem[];
	const matchGroupsCenters = matchInfo.matchingGroups.map((group) => getMatchGroupCenterIndex(group, matchInfo.matchingList));
	matchInfo.matchingList
		.filter((x) => x.matched)
		.forEach((y) => {
			const itemIsAtMatchGroupCenter = matchGroupsCenters.includes(y.index);
			newItemList[y.index] = itemIsAtMatchGroupCenter ? getLevelItemByFusion(y, newItemList[y.index]) : null;
		});

	return newItemList;
};

const validateInitialItems = (initialItems: readonly LevelItem[], initialTiles: readonly LevelTile[]): LevelItem[] => {
	const validatedItems = initialItems.map((item, index) => {
		if (initialTiles[index] === null || item === null) return null;
		!item.id && (item.id = uuid());
		return item;
	});

	return validatedItems;
};

const LevelManager = () => {
	const selectedLevelQuery = useSelectedLevel();
	const [swappedItems, setSwappedItems] = useRecoilState(swappedItemsState);
	const [levelItems, setLevelItems] = useRecoilState(levelItemsState);
	const [levelTiles, setLevelTiles] = useRecoilState(levelTilesState);
	const setLevelMoves = useSetRecoilState(levelMovesState);
	const [finishedMoving, setFinishedMoving] = useRecoilState(finishedMovingState);
	const setMatchList = useSetRecoilState(matchListState);
	const setPossibleCombinations = useSetRecoilState(possibleCombinationsState);
	const [comboCount, setComboCount] = useRecoilState(comboCountState);
	const selectedLevel = useMemo(() => selectedLevelQuery.data, [selectedLevelQuery.data]) as LevelData;
	const playAudio = useAudio();

	const itemsWereSwapped = useRef(false);

	useEffect(() => {
		setupLevel();
	}, []);

	useEffect(() => swapItems(false), [swappedItems]);

	useEffectAfterMount(() => {
		finishedMoving && checkForPossibleCombinations();
	}, [finishedMoving]);

	const setupLevel = () => {
		const initialItems = validateInitialItems(selectedLevel.initialItems, selectedLevel.initialTiles);
		setLevelTiles(selectedLevel.initialTiles);
		setLevelItems(initialItems);
		setLevelMoves({ done: 0, total: selectedLevel.maximumMoves, spentAllMoves: false });
	};

	const swapItems = (undo: boolean) => {
		if (swappedItems.some((x) => x === null)) return;
		itemsWereSwapped.current = true;

		const firstIndex = swappedItems[0] ?? -1;
		const secondIndex = swappedItems[1] ?? -1;

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

		setFinishedMoving(false);
		setLevelItems(newLevelItems);
		setTimeout(() => checkForMatches(newLevelItems, true), ANIMATION_TIME_MS);
	};

	const checkForMatches = async (itemList: LevelItem[], checkSwap: boolean): Promise<void> => {
		const matchInfo = checkForMatchings(itemList, levelTiles, itemsWereSwapped.current ? swappedItems : undefined);

		if (matchInfo.thereWereMatches || !allTilesFilled(itemList, levelTiles)) {
			itemsWereSwapped.current &&
				setLevelMoves((moves) => ({ done: moves.done + 1, total: moves.total, spentAllMoves: moves.done + 1 >= moves.total }));
			setSwappedItems([null, null]);
			itemsWereSwapped.current = false;
			playAudio({ audioName: 'match', speed: 1 + (comboCount + 1) / 10 });
			setComboCount((combo) => (combo < COMBO_LIMIT ? combo + 1 : combo));
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

		setComboCount(1);
		setTimeout(() => {
			setFinishedMoving(true);
		}, ANIMATION_TIME_MS);
	};

	const checkForPossibleCombinations = () => {
		const possibleCombinations = levelHasPossibleCombinations(levelItems, levelTiles);
		setPossibleCombinations(possibleCombinations);
	};

	return <></>;
};

export default LevelManager;
