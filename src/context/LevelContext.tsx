import React, { useContext, createContext, useState, useEffect, useRef } from 'react';
import { checkForMatchings } from '../utils/tile-matching';

type TilePair = [number | null, number | null];

type LevelData = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elements: HTMLElement[]) => void;
	selectedTiles: TilePair;
	updateSelectedTiles: (tilePair: TilePair) => void;
	currentLevelItems: LevelItem[];
	previousLevelItems: LevelItem[];
	updateLevelItems: (items: LevelItem[]) => void;
	matchingList: MatchData[];
	lockInteraction: boolean;
};

export const LevelContext = createContext<LevelData | null>(null);

type LevelContextProviderProps = {
	children: JSX.Element;
};

const LevelContextProvider = ({ children }: LevelContextProviderProps) => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();
	const [selectedTiles, setSelectedTiles] = useState<TilePair>([null, null]);
	const [currentLevelItems, setCurrentLevelItems] = useState<LevelItem[]>([]);
	const [lockInteraction, setLockInteraction] = useState<boolean>(false);
	const [matchingList, setMatchingList] = useState<LevelItem[]>([]);
	const previousLevelItemsRef = useRef<LevelItem[]>([]);

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);
	const updateSelectedTiles = (tilePair: TilePair): void => setSelectedTiles(tilePair);
	const updateLevelItems = (items: LevelItem[]): void => {
		previousLevelItemsRef.current = currentLevelItems;
		setCurrentLevelItems(items);
	};

	useEffect(() => {
		
	}, []);


	const providerValue: LevelData = {
		gridElements,
		updateGridElements,
		selectedTiles,
		updateSelectedTiles,
		currentLevelItems,
		previousLevelItems: previousLevelItemsRef.current,
		updateLevelItems,
		matchingList: [],
		lockInteraction,
	};

	return <LevelContext.Provider value={providerValue}>{children}</LevelContext.Provider>;
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
