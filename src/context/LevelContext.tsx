import { useContext, createContext, useState } from 'react';

type LevelContextType = {
	gridElements: HTMLElement[] | undefined;
	updateGridElements: (elementas: HTMLElement[]) => void;
};

type LevelData = {
	gridElements: HTMLElement[];
};

export const LevelContext = createContext<LevelContextType | null>(null);

const LevelContextProvider = () => {
	const [gridElements, setGridElements] = useState<HTMLElement[] | undefined>();

	const updateGridElements = (elements: HTMLElement[]): void => setGridElements(elements);

	return () => {
		<LevelContext.Provider value={{ gridElements, updateGridElements }}></LevelContext.Provider>;
	};
};

export const useLevelContext = (): LevelContextType | null => useContext(LevelContext);

export default LevelContextProvider;
