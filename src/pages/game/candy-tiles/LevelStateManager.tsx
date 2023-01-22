import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { finishedMovingState } from './atoms/finishedMoving';
import { levelItemsState } from './atoms/levelItems';
import { levelMovesState } from './atoms/levelMoves';
import { levelTasksState } from './atoms/levelTasks';
import { levelTilesState } from './atoms/levelTiles';
import { matchListState } from './atoms/matchList';
import { scoreState } from './atoms/score';
import { levelFxListState } from './atoms/levelFxList';
import { swappedItemsState } from './atoms/swappedItems';
import { possibleCombinationsState } from './atoms/possibleCombinations';

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
