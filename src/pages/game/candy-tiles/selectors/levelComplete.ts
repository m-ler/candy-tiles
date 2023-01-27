import { selector } from 'recoil';
import { SCORE_RATING } from '../../../../config';
import { selectedLevelState } from '../../../../store/selectedLevel';
import { levelMovesState } from '../atoms/levelMoves';
import { levelTasksState } from '../atoms/levelTasks';
import { scoreState } from '../atoms/score';

export const levelCompleteState = selector<boolean>({
	key: 'levelComplete',
	get: ({ get }) => {
		const levelData = get(selectedLevelState);
		const levelMoves = get(levelMovesState);
		const targetScore = levelData.score;
		const targetTasks = levelData.tasks as { [key: string]: number };
		const score = get(scoreState);
		const tasks = get(levelTasksState) as { [key: string]: number };
		const scorePercentage = Math.round((score * 100) / targetScore);

		const minimumScore = scorePercentage >= SCORE_RATING.oneStar;
		const allTasksComplete = Object.keys(targetTasks).every((x) => targetTasks[x] <= tasks[x]);

		return minimumScore && allTasksComplete && levelMoves.spentAllMoves;
	},
});
