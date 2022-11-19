import React, { useContext, createContext, useState, useEffect, useRef } from 'react';

type TilePair = [number | null, number | null];

type LevelData = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elements: HTMLElement[]) => void;
	selectedTiles: TilePair;
	updateSelectedTiles: (tilePair: TilePair) => void;
	currentLevelItems: (Candy | Tile)[];
	previousLevelItems: (Candy | Tile)[];
	updateLevelItems: (items: (Candy | Tile)[]) => void;
};

export const LevelContext = createContext<LevelData | null>(null);

type LevelContextProviderProps = {
	children: JSX.Element;
};

const LevelContextProvider = ({ children }: LevelContextProviderProps) => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();
	const [selectedTiles, setSelectedTiles] = useState<TilePair>([null, null]);
	const [currentLevelItems, setCurrentLevelItems] = useState<(Candy | Tile)[]>([]);
	const previousLevelItemsRef = useRef<(Candy | Tile)[]>([]);

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);
	const updateSelectedTiles = (tilePair: TilePair): void => setSelectedTiles(tilePair);
	const updateLevelItems = (items: (Candy | Tile)[]): void => setCurrentLevelItems(items);

	useEffect(() => {
		previousLevelItemsRef.current = currentLevelItems;
	}, [currentLevelItems]);

	const providerValue: LevelData = {
		gridElements,
		updateGridElements,
		selectedTiles,
		updateSelectedTiles,
		currentLevelItems,
		previousLevelItems: previousLevelItemsRef.current,
		updateLevelItems,
	};

	return <LevelContext.Provider value={providerValue}>{children}</LevelContext.Provider>;
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
