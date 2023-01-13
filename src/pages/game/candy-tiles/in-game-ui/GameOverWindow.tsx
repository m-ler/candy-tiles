import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../../../recoil/atoms/levelMoves';

const GameOverWindow = () => {
	const levelMoves = useRecoilValue(levelMovesState);
	const [show, setShow] = useState(false);
	const popupElementRef = useRef<HTMLDivElement>(null);

	return levelMoves.spendAllMoves ? (
		<div className='absolute top-0 left-0 w-full h-full flex bg-black/20 overflow-hidden'>
			<div
				ref={popupElementRef}
				className='bg-white w-[min(100%,500px)] h-min m-auto flex flex-col items-center rounded-md p-[16px] gap-y-[12px]'
			>
				<span className='m-auto font-YellowCandy text-[22px]'>Game Over</span>

				<Button variant='contained'>Try Again</Button>
			</div>
		</div>
	) : (
		<></>
	);
};

export default GameOverWindow;
