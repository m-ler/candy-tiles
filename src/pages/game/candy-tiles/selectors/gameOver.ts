import { selector } from 'recoil';
import { finishedMovingState } from '../atoms/finishedMoving';
import { levelMovesState } from '../atoms/levelMoves';
import { possibleCombinationsState } from '../atoms/possibleCombinations';

export const gameOverState = selector<boolean>({
	key: 'gameOver',
	get: ({ get }) => {
		const finishedMoving = get(finishedMovingState);
		const levelMoves = get(levelMovesState);
		const possibleCombinations = get(possibleCombinationsState);

		return finishedMoving && (levelMoves.spentAllMoves || !possibleCombinations);
	},
});
