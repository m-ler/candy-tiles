import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { finishedMovingState } from './store/finishedMoving';
import { levelItemsState } from './store/levelItems';
import { levelMovesState } from './store/levelMoves';
import { levelTasksState } from './store/levelTasks';
import { levelTilesState } from './store/levelTiles';
import { matchListState } from './store/matchList';
import { scoreState } from './store/score';
import { levelFxListState } from './store/levelFxList';
import { swappedItemsState } from './store/swappedItems';
import { possibleCombinationsState } from './store/possibleCombinations';

const LevelStateManager = () => {
	const resetFinishedMoving = useResetRecoilState(finishedMovingState);
	const resetLevelItems = useResetRecoilState(levelItemsState);
	const resetLevelTiles = useResetRecoilState(levelTilesState);
	const resetLevelMoves = useResetRecoilState(levelMovesState);
	const resetLevelTasks = useResetRecoilState(levelTasksState);
	const resetMatchList = useResetRecoilState(matchListState);
	const resetScore = useResetRecoilState(scoreState);
	const resetLevelFxList = useResetRecoilState(levelFxListState);
	const resetSwappedItems = useResetRecoilState(swappedItemsState);
	const resetPossibleCombinations = useResetRecoilState(possibleCombinationsState);

	useEffect(() => {
		return () => {
			resetLevelStateToDefault();
		};
	}, []);

	const resetLevelStateToDefault = () => {
		resetFinishedMoving();
		resetLevelItems();
		resetLevelTiles();
		resetLevelMoves();
		resetLevelTasks();
		resetMatchList();
		resetScore();
		resetLevelFxList();
		resetSwappedItems();
		resetPossibleCombinations();
	};
	return <></>;
};

export default LevelStateManager;
