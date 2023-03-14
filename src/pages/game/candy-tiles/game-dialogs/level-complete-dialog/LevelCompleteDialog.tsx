import { Button, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAudio from '../../../../../hooks/useAudio';
import MenuIconButtonSecondary from '../../MenuIconButtonSecondary';
import { scoreState } from '../../store/score';
import { levelCompleteState } from '../../store/levelComplete';
import { levelScoreStarsState } from '../../store/levelScoreStars';
import CandyTilesDialog from '../CandyTilesDialog';
import Star from './Star';
import { MdReplay } from 'react-icons/md';
import { FaFlagCheckered } from 'react-icons/fa';
import useReloadPage from '../../../../../hooks/useReloadPage';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import RateLevelButtons from '../RateLevelButtons';

const animateScore = (score: number) => {
	anime({
		targets: '#score-label',
		innerHTML: ['0 points', `${score} points`],
		duration: 1500,
		round: 1,
		delay: 500,
		easing: 'linear',
	});
};

const LevelCompleteDialog = () => {
	const levelComplete = useRecoilValue(levelCompleteState);
	const score = useRecoilValue(scoreState);
	const levelScoreStars = useRecoilValue(levelScoreStarsState);
	const playAudio = useAudio();
	const reloadPage = useReloadPage();
	const navigate = useNavigate();

	useEffect(() => {
		levelComplete && onLevelComplete();
	}, [levelComplete]);

	const onLevelComplete = () => {
		setTimeout(() => playAudio({ audioName: 'levelComplete', volume: 0.6 }), 500);
		animateScore(score);
	};

	const onPlayAgainClick = () => reloadPage();
	const onNextClick = () => navigate('/levels');

	return levelComplete ? (
		<CandyTilesDialog className="max-w-[300px]">
			<div className="flex flex-col w-full items-center gap-[12px] relative">
				<span className="m-auto font-YellowCandy text-[24px] block text-center text-p-light">Level complete!</span>
				<div className="w-fit flex gap-x-[20px] justify-center bg-black/25 p-[16px] rounded-lg z-0">
					<Star id="level-complete-star1" animationDelayMs={700} lit={levelScoreStars.first}></Star>
					<Star id="level-complete-star2" animationDelayMs={1000} lit={levelScoreStars.second}></Star>
					<Star id="level-complete-star3" animationDelayMs={1300} lit={levelScoreStars.third}></Star>
				</div>

				<div className="flex items-center gap-x-[10px] bg-black/25 px-[20px] py-[10px] rounded">
					<FaFlagCheckered className="text-s-light"></FaFlagCheckered>
					<span id="score-label" className="text-s-main font-YellowCandy text-[18px]">
						{score} points
					</span>
				</div>

				<RateLevelButtons />

				<div className="flex gap-x-[10px]">
					<Tooltip title="Play again">
						<div>
							<MenuIconButtonSecondary onClick={onPlayAgainClick}>
								<MdReplay></MdReplay>
							</MenuIconButtonSecondary>
						</div>
					</Tooltip>

					<Tooltip title="More levels">
						<Button variant="contained" color="secondary" disableElevation sx={{ fontWeight: 'bolder' }} onClick={onNextClick}>
							Next
						</Button>
					</Tooltip>
				</div>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default LevelCompleteDialog;
