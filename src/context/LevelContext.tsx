import { useContext, createContext, useState, useEffect, useRef } from 'react';
import LevelManager from '../pages/game/candy-tiles/level-grid/level-manager';

type TilePair = [number | null, number | null];

type LevelData = {
	selectedTiles: TilePair;
	updateSelectedTiles: (tilePair: TilePair) => void;
	currentLevelItems: LevelItem[];
	updateLevelItems: (items: LevelItem[]) => void;
};

export const LevelContext = createContext<LevelData | null>(null);

type LevelContextProviderProps = {
	children: JSX.Element;
};

const LevelContextProvider = ({ children }: LevelContextProviderProps) => {
	const [selectedTiles, setSelectedTiles] = useState<TilePair>([null, null]);
	const [currentLevelItems, setCurrentLevelItems] = useState<LevelItem[]>([]);
	const previousLevelItemsRef = useRef<LevelItem[]>([]);

	const updateSelectedTiles = (tilePair: TilePair): void => setSelectedTiles(tilePair);
	const updateLevelItems = (items: LevelItem[]): void => {
		previousLevelItemsRef.current = currentLevelItems;
		setCurrentLevelItems(items);
	};

	useEffect(() => {
		LevelManager.subscribeItemsRerender(onItemsRerender);
		return () => {
			LevelManager.unsubscribeItemsRerender(onItemsRerender);
		};
	}, []);

	useEffect(() => {}, [currentLevelItems]);

	const onItemsRerender = (items: LevelItem[]): void => setCurrentLevelItems(items);

	const providerValue: LevelData = {
		selectedTiles,
		updateSelectedTiles,
		currentLevelItems,
		updateLevelItems,
	};

	return <LevelContext.Provider value={providerValue}>{children}</LevelContext.Provider>;
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
