import React, { useContext, createContext, useState, useEffect } from 'react';

type TilePair = [number | null, number | null];

type LevelData = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elements: HTMLElement[]) => void;
	selectedTiles: TilePair;
	updateSelectedTiles: (tilePair: TilePair) => void;
	currentLevelItems: LevelItem[];
	previousLevelItems: LevelItem[];
};

export const LevelContext = createContext<LevelData | null>(null);

type LevelContextProviderProps = {
	children: JSX.Element;
};

const LevelContextProvider = ({ children }: LevelContextProviderProps) => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();
	const [selectedTiles, setSelectedTiles] = useState<TilePair>([null, null]);

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);
	const updateSelectedTiles = (tilePair: TilePair): void => setSelectedTiles(tilePair);
	const providerValue: LevelData = {
		gridElements,
		updateGridElements,
		selectedTiles,
		updateSelectedTiles,
		currentLevelItems: [],
		previousLevelItems: [],
	};

	return <LevelContext.Provider value={providerValue}>{children}</LevelContext.Provider>;
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
