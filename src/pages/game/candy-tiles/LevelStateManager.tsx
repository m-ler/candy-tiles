import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { allowSwapState } from './atoms/allowSwap';
import { levelItemsState } from './atoms/levelItems';
import { levelMovesState } from './atoms/levelMoves';
import { levelTasksState } from './atoms/levelTasks';
import { levelTilesState } from './atoms/levelTiles';
import { matchListState } from './atoms/matchList';
import { scoreState } from './atoms/score';
import { scoreFxListState } from './atoms/scoreFxList';
import { swappedItemsState } from './atoms/swappedItems';

const LevelStateManager = () => {
	const resetAllowSwap = useResetRecoilState(allowSwapState);
	const resetLevelItems = useResetRecoilState(levelItemsState);
	const resetLevelTiles = useResetRecoilState(levelTilesState);
	const resetLevelMoves = useResetRecoilState(levelMovesState);
	const resetLevelTasks = useResetRecoilState(levelTasksState);
	const resetMatchList = useResetRecoilState(matchListState);
	const resetScore = useResetRecoilState(scoreState);
	const resetScoreFxList = useResetRecoilState(scoreFxListState);
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
		resetScoreFxList();
		resetSwappedItems();
	};
	return <></>;
};

export default LevelStateManager;
