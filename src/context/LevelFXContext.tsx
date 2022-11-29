import { useContext, createContext, useState } from 'react';

type LevelFXData = {
	levelFXList: LevelFX[];
	updateLevelFXList: (fxList: LevelFX[]) => void;
};

const LevelFXContext = createContext<LevelFXData | null>(null);

type LevelFXContextProviderProps = {
	children: JSX.Element;
};

const LevelFXContextProvider = ({ children }: LevelFXContextProviderProps) => {
	const [levelFXList, setLevelFXList] = useState<LevelFX[]>([]);
	const updateLevelFXList = (fxList: LevelFX[]): void => {
		console.log('lkdsfj');
		setLevelFXList(fxList);
	};

	const providerValue: LevelFXData = {
		levelFXList,
		updateLevelFXList,
	};

	return <LevelFXContext.Provider value={providerValue}>{children}</LevelFXContext.Provider>;
};

export const useLevelFXContext = (): LevelFXData | null => useContext(LevelFXContext);

export default LevelFXContextProvider;
