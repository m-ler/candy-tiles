import { Button, Tooltip } from '@mui/material';
import anime from 'animejs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../atoms/levelMoves';
import CandyTilesDialog from '../CandyTilesDialog';
import MenuIconButtonSecondary from '../../../../../mui/components/MenuIconButtonSecondary';
import { FaHome } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import { allowSwapState } from '../../atoms/allowSwap';
import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../../hooks/useUnmountAnimation';

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

const animateEnd = (onComplete?: () => void) => {
	anime({
		targets: '#game-over-dialog',
		translateX: ['0%', '-100%'],
		opacity: 0,
		easing: 'easeInBack',
		duration: 300,
		complete: onComplete,
	});
};

const GameOverDialog = () => {
	const levelMoves = useRecoilValue(levelMovesState);
	const allowSwap = useRecoilValue(allowSwapState);
	const navigate = useNavigate();
	const gameOver = levelMoves.spendAllMoves && allowSwap;
	const unmountAnimation = useUnmountAnimation('#game-container');

	useEffect(() => {
		gameOver && animateStart();
	}, [allowSwap]);

	const goBackOnClick = () => {
		animateEnd(() => unmountAnimation(() => navigate('/')));
	};

	const tryAgainOnClick = () => {
		animateEnd(() => unmountAnimation(() => navigate(0)));
	};

	return gameOver ? (
		<CandyTilesDialog id='game-over-dialog'>
			<div className='flex flex-col w-full items-center gap-[12px]'>
				<div>
					<span className='m-auto font-YellowCandy text-[22px] block text-center text-p-light'>Level failed!</span>
					<span className='m-auto font-YellowCandy text-[18px] block text-center text-s-light'>You did not reach the goal!</span>
				</div>
				<div className='flex gap-[12px]'>
					<Tooltip title='Go back'>
						<div>
							<MenuIconButtonSecondary color='secondary' onClick={goBackOnClick}>
								<FaHome className=''></FaHome>
							</MenuIconButtonSecondary>
						</div>
					</Tooltip>
					<Tooltip title='Try again'>
						<div>
							<MenuIconButtonSecondary color='secondary' onClick={tryAgainOnClick}>
								<MdReplay></MdReplay>
							</MenuIconButtonSecondary>
						</div>
					</Tooltip>
				</div>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default GameOverDialog;
