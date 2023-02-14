import anime, { AnimeInstance } from 'animejs';
import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { SCORE_RATING } from '../../../../../config';
import useSelectedLevel from '../../../../../hooks/useSelectedLevel';
import { muiPalette } from '../../../../../mui/theme';
import { clampNumber } from '../../../../../utils/math';
import { scoreState } from '../../store/score';
import ComboCounter from './ComboCounter';
import ScoreBarStar from './ScoreBarStar';

const scoreObj = { score: 0 };
let scoreAnimation: AnimeInstance;
const animateScoreUpdate = (scoreElement: HTMLElement, newScore: number): void => {
	anime.remove(scoreAnimation);
	scoreAnimation = anime({
		targets: [scoreObj, scoreElement],
		score: newScore,
		color: {
			value: ['#ffb940', muiPalette.primary.light],
			duration: 1000,
			easing: 'linear',
		},
		easing: 'easeOutExpo',
		duration: 1000,
		round: true,
		update: () => {
			scoreElement.innerHTML = scoreObj.score.toString();
		},
	});
};

const ScoreBar = () => {
	const selectedLevel = useSelectedLevel();
	const targetScore = useMemo(() => selectedLevel.data?.score || 0, [selectedLevel.data]);
	const score = useRecoilValue(scoreState);
	const scoreNumberElementRef = useRef<HTMLElement | null>(null);
	const scoreProgressPercentage = clampNumber(Math.floor((score * 100) / targetScore), 0, 100);

	useEffect(() => {
		animateScoreUpdate(scoreNumberElementRef.current as HTMLElement, score);
	}, [score]);

	return (
		<div className="flex flex-col">
			<div className="h-[40px] w-[150px] md:w-[100px] bg-t-dark p-[5px] relative rounded-lg ">
				<span
					className="bg-s-dark block w-full h-full origin-left rounded-md border-light-blue"
					style={{
						width: `${scoreProgressPercentage}%`,
					}}
				></span>
				<span
					className="text-white font-YellowCandy text-[18px] md:text-[14px] absolute block top-0 left-0 right-0 bottom-0 text-center leading-[40px] font-medium"
					ref={scoreNumberElementRef}
				></span>
				<ScoreBarStar
					elementId="score-bar1"
					positionX={65}
					targetPercentage={SCORE_RATING.oneStar}
					scorePercentage={scoreProgressPercentage}
				></ScoreBarStar>
				<ScoreBarStar
					elementId="score-bar2"
					positionX={77.5}
					targetPercentage={SCORE_RATING.twoStars}
					scorePercentage={scoreProgressPercentage}
				></ScoreBarStar>
				<ScoreBarStar
					elementId="score-bar3"
					positionX={90}
					targetPercentage={SCORE_RATING.threeStars}
					scorePercentage={scoreProgressPercentage}
				></ScoreBarStar>
				<ComboCounter></ComboCounter>
			</div>
		</div>
	);
};

export default ScoreBar;
