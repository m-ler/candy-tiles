import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../atoms/levelMoves';
import CandyTilesDialog from '../CandyTilesDialog';
import { finishedMovingState } from '../../atoms/finishedMoving';
import GameOverActions from '../GameOverActions';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';
import useGameOverSFX from '../hooks/useGameOverSFX';

const GameOverDialog = () => {
	const levelMoves = useRecoilValue(levelMovesState);
	const finishedMoving = useRecoilValue(finishedMovingState);
	const gameOver = levelMoves.spendAllMoves && finishedMoving;
	const animateMount = useDialogMountAnimation('#game-over-dialog', { duration: 500, delay: 500 });
	const playGameOverSFX = useGameOverSFX();

	useEffect(() => {
		gameOver && onGameOver();
	}, [finishedMoving]);

	const onGameOver = () => {
		animateMount();
		playGameOverSFX();
	};

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
