import { useContext, createContext, useState } from 'react';

type LevelData = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elementas: HTMLElement[]) => void;

	currentLevelItems?: any[]; // TODO DEFINE GLOBAL TYPE FOR ITEM
};

export const LevelContext = createContext<LevelData | null>(null);

const LevelContextProvider = () => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);

	return () => {
		<LevelContext.Provider value={{ gridElements, updateGridElements }}></LevelContext.Provider>;
	};
};

export const useLevelContext = (): LevelData | null => useContext(LevelContext);

export default LevelContextProvider;
