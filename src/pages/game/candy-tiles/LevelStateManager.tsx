import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { allowSwapState } from './atoms/allowSwap';
import { levelItemsState } from './atoms/levelItems';
import { levelMovesState } from './atoms/levelMoves';
import { levelTasksState } from './atoms/levelTasks';
import { levelTilesState } from './atoms/levelTiles';
import { matchListState } from './atoms/matchList';
import { scoreState } from './atoms/score';
import { levelFxListState } from './atoms/levelFxList';
import { swappedItemsState } from './atoms/swappedItems';

const LevelStateManager = () => {
	const resetAllowSwap = useResetRecoilState(allowSwapState);
	const resetLevelItems = useResetRecoilState(levelItemsState);
	const resetLevelTiles = useResetRecoilState(levelTilesState);
	const resetLevelMoves = useResetRecoilState(levelMovesState);
	const resetLevelTasks = useResetRecoilState(levelTasksState);
	const resetMatchList = useResetRecoilState(matchListState);
	const resetScore = useResetRecoilState(scoreState);
	const resetLevelFxList = useResetRecoilState(levelFxListState);
	const resetSwappedItems = useResetRecoilState(swappedItemsState);

	useEffect(() => {
		return () => {
			resetLevelStateToDefault();
		};
	}, []);

	const resetLevelStateToDefault = () => {
		resetAllowSwap();
		resetLevelItems();
		resetLevelTiles();
		resetLevelMoves();
		resetLevelTasks();
		resetMatchList();
		resetScore();
		resetLevelFxList();
		resetSwappedItems();
	};
	return <></>;
};

export default LevelStateManager;
