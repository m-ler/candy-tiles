import { selector } from 'recoil';
import { SCORE_RATING } from '../../../../config';
import { selectedLevelState } from '../../../../store/selectedLevel';
import { finishedMovingState } from '../store/finishedMoving';
import { levelMovesState } from '../store/levelMoves';
import { levelTasksState } from '../store/levelTasks';
import { levelScorePercentageState } from './levelScorePercentage';
import { possibleCombinationsState } from '../store/possibleCombinations';

export const levelCompleteState = selector<boolean>({
	key: 'levelComplete',
	get: ({ get }) => {
		const levelData = get(selectedLevelState);
		const finishedMoving = get(finishedMovingState);
		const possibleCombinations = get(possibleCombinationsState);
		const levelMoves = get(levelMovesState);
		const targetTasks = levelData?.file.tasks as { [key: string]: number };
		const tasks = get(levelTasksState) as { [key: string]: number };
		const scorePercentage = get(levelScorePercentageState);

		const minimumScore = scorePercentage >= SCORE_RATING.oneStar;
		const allTasksComplete = Object.keys(targetTasks).every((x) => targetTasks[x] <= tasks[x]);

		return minimumScore && allTasksComplete && finishedMoving && (levelMoves.spentAllMoves || !possibleCombinations);
	},
});
