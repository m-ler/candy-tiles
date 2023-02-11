import { selector } from 'recoil';
import { selectedLevelState } from '../../../../store/selectedLevel';
import { scoreState } from '../store/score';

export const levelScorePercentageState = selector<number>({
	key: 'levelScorePercentage',
	get: ({ get }) => {
		const targetScore = get(selectedLevelState).score;
		const score = get(scoreState);
		const scorePercentage = Math.round((score * 100) / targetScore);
		return scorePercentage;
	},
});
