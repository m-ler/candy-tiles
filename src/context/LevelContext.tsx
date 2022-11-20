import React, { useContext, createContext, useState, useEffect, useRef } from 'react';
import { checkForMatchings } from '../utils/tile-matching';

type TilePair = [number | null, number | null];

type LevelData = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elements: HTMLElement[]) => void;
	selectedTiles: TilePair;
	updateSelectedTiles: (tilePair: TilePair) => void;
	currentLevelItems: (LevelItem | null)[];
	previousLevelItems: (LevelItem | null)[];
	updateLevelItems: (items: (LevelItem | null)[]) => void;
	matchingList: MatchList;
};

export const LevelContext = createContext<LevelData | null>(null);

type LevelContextProviderProps = {
	children: JSX.Element;
};

const LevelContextProvider = ({ children }: LevelContextProviderProps) => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();
	const [selectedTiles, setSelectedTiles] = useState<TilePair>([null, null]);
	const [currentLevelItems, setCurrentLevelItems] = useState<(LevelItem | null)[]>([]);
	const [matchingList, setMatchingList] = useState<MatchList>([]);
	const previousLevelItemsRef = useRef<(LevelItem | null)[]>([]);

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);
	const updateSelectedTiles = (tilePair: TilePair): void => setSelectedTiles(tilePair);
	const updateLevelItems = (items: (LevelItem | null)[]): void => {
		console.log('pokémon');

		previousLevelItemsRef.current = currentLevelItems;
		setCurrentLevelItems(items);
	};

	useEffect(() => {
		const matchResult = checkForMatchings(currentLevelItems);
		if (matchResult.thereWereMatches) {
			setMatchingList(matchResult.matchingList);
		} else {
			setMatchingList(matchResult.matchingList);
			setTimeout(() => {
				console.log(previousLevelItemsRef.current[1]);
				console.log(currentLevelItems[1]);
				//previousLevelItemsRef.current.length > 0 && setCurrentLevelItems(previousLevelItemsRef.current);
			}, 200);
		}
	}, [currentLevelItems]);

	const providerValue: LevelData = {
		gridElements,
		updateGridElements,
		selectedTiles,
		updateSelectedTiles,
		currentLevelItems,
		previousLevelItems: previousLevelItemsRef.current,
		updateLevelItems,
		matchingList,
	};

	return <LevelContext.Provider value={providerValue}>{children}</LevelContext.Provider>;
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
