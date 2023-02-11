import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAudio from '../../../../../hooks/useAudio';
import MenuIconButtonSecondary from '../../../../../mui/components/MenuIconButtonSecondary';
import { scoreState } from '../../store/score';
import { levelCompleteState } from '../../store/levelComplete';
import { levelScoreStarsState } from '../../store/levelScoreStars';
import CandyTilesDialog from '../CandyTilesDialog';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';
import Star from './Star';
import { MdReplay } from 'react-icons/md';
import { FaFlagCheckered } from 'react-icons/fa';
import useReloadPage from '../../../../../hooks/useReloadPage';
import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../../hooks/useUnmountAnimation';
import anime from 'animejs';
import Tooltip from './../../../../../mui/components/Tooltip';

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
	const animateMount = useDialogMountAnimation('#level-complete-dialog', { duration: 500, delay: 500 });
	const score = useRecoilValue(scoreState);
	const levelScoreStars = useRecoilValue(levelScoreStarsState);
	const playAudio = useAudio();
	const reloadPage = useReloadPage();
	const navigate = useNavigate();
	const animateUnmount = useUnmountAnimation('#game-container');

	useEffect(() => {
		levelComplete && onLevelComplete();
	}, [levelComplete]);

	const onLevelComplete = () => {
		animateMount();
		setTimeout(() => playAudio({ audioName: 'levelComplete', volume: 0.6 }), 500);
		animateScore(score);
	};

	const onPlayAgainClick = () => {
		animateUnmount(() => reloadPage());
	};

	const onNextClick = () => {
		animateUnmount(() => navigate('/'));
	};

	return levelComplete ? (
		<CandyTilesDialog id="level-complete-dialog" className="max-w-[300px]">
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
