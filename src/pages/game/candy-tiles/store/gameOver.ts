import { selector } from 'recoil';
import { finishedMovingState } from './finishedMoving';
import { levelMovesState } from './levelMoves';
import { possibleCombinationsState } from './possibleCombinations';
import { levelCompleteState } from './levelComplete';

export const gameOverState = selector<boolean>({
	key: 'gameOver',
	get: ({ get }) => {
		const levelComplete = get(levelCompleteState);
		const finishedMoving = get(finishedMovingState);
		const levelMoves = get(levelMovesState);
		const possibleCombinations = get(possibleCombinationsState);

		return finishedMoving && !levelComplete && (levelMoves.spentAllMoves || !possibleCombinations);
	},
});
