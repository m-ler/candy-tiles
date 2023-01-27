import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { scoreState } from '../../atoms/score';
import { levelCompleteState } from '../../selectors/levelComplete';
import CandyTilesDialog from '../CandyTilesDialog';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';
import Star from './Star';

const LevelCompleteDialog = () => {
	const levelComplete = useRecoilValue(levelCompleteState);
	const animateMount = useDialogMountAnimation('#level-complete-dialog', { duration: 500, delay: 500 });
	const score = useRecoilValue(scoreState);

	useEffect(() => {
		levelComplete && onLevelComplete();
	}, [levelComplete]);

	const onLevelComplete = () => {
		animateMount();
	};

	return levelComplete ? (
		<CandyTilesDialog id="level-complete-dialog">
			<div className="flex flex-col w-full items-center gap-[12px] relative">
				<span className="m-auto font-YellowCandy text-[24px] block text-center text-p-light">Level complete!</span>
				<div className="w-fit flex gap-x-[20px] justify-center bg-black/25 p-[16px] rounded-lg z-0">
					<Star id="level-complete-star1"></Star>
					<Star id="level-complete-star2"></Star>
					<Star id="level-complete-star3"></Star>
				</div>
				<div className="flex flex-col items-center mb-[20px] z-0">
					<span className="font-YellowCandy text-[22px] text-s-light">Score</span>
					<span className="block bg-s-dark px-[40px] py-[5px] font-YellowCandy text-s-light text-[22px] rounded">{score}</span>
				</div>

				<Button variant="contained" color="secondary" sx={{ fontWeight: 'bolder' }}>
					Next
				</Button>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default LevelCompleteDialog;
