import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../atoms/levelMoves';
import CandyTilesDialog from '../CandyTilesDialog';
import { finishedMovingState } from '../../atoms/finishedMoving';
import GameOverActions from '../GameOverActions';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';
import useAudio from '../../../../../hooks/useAudio';
import { levelCompleteState } from '../../selectors/levelComplete';

const GameOverDialog = () => {
	const levelMoves = useRecoilValue(levelMovesState);
	const finishedMoving = useRecoilValue(finishedMovingState);
	const levelComplete = useRecoilValue(levelCompleteState);
	const gameOver = levelMoves.spentAllMoves && finishedMoving && !levelComplete;
	const animateMount = useDialogMountAnimation('#game-over-dialog', { duration: 500, delay: 500 });
	const playAudio = useAudio();

	useEffect(() => {
		gameOver && onGameOver();
	}, [finishedMoving]);

	const onGameOver = () => {
		animateMount();
		playAudio({ audioName: 'gameOver', volume: 0.7 });
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
