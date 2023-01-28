import { selector } from 'recoil';
import { SCORE_RATING } from '../../../../config';
import { levelScorePercentageState } from './levelScorePercentage';

type ScoreStars = {
	first: boolean;
	second: boolean;
	third: boolean;
};

export const levelScoreStarsState = selector<ScoreStars>({
	key: 'levelScoreStars',
	get: ({ get }) => {
		const scorePercentage = get(levelScorePercentageState);
		return {
			first: scorePercentage >= SCORE_RATING.oneStar,
			second: scorePercentage >= SCORE_RATING.twoStars,
			third: scorePercentage >= SCORE_RATING.threeStars,
		};
	},
});
