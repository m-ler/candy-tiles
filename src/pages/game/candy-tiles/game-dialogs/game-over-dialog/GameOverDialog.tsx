import anime from 'animejs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../atoms/levelMoves';
import CandyTilesDialog from '../CandyTilesDialog';
import { finishedMovingState } from '../../atoms/finishedMoving';
import GameOverActions from '../GameOverActions';

const animateStart = () => {
	anime({
		targets: '#game-over-dialog',
		opacity: [0, 1],
		translateX: ['100%', '0%'],
		easing: 'easeOutBack',
		duration: 500,
		delay: 500,
	});
};

const GameOverDialog = () => {
	const levelMoves = useRecoilValue(levelMovesState);
	const finishedMoving = useRecoilValue(finishedMovingState);
	const gameOver = levelMoves.spendAllMoves && finishedMoving;
	
	useEffect(() => {
		gameOver && animateStart();
	}, [finishedMoving]);

	return gameOver ? (
		<CandyTilesDialog id="game-over-dialog">
			<div className="flex flex-col w-full items-center gap-[12px]">
				<div>
					<span className="m-auto font-YellowCandy text-[22px] block text-center text-p-light">Level failed!</span>
					<span className="m-auto font-YellowCandy text-[18px] block text-center text-s-light">You did not reach the goal!</span>
				</div>
				<GameOverActions dialogID="game-over-dialog"></GameOverActions>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default GameOverDialog;
