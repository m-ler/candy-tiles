import { TbHandMove } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { levelMovesState } from '../../atoms/levelMoves';

const MoveCounter = () => {
	const levelMoves = useRecoilValue(levelMovesState);

	return (
		<div className='bg-s-dark rounded-lg p-[12px] w-full md:w-min md:gap-y-[12px]'>
			<h3 className='text-p-light font-YellowCandy font-medium block w-full text-center text-[20px] flex items-center gap-x-[8px] justify-center'>
				<TbHandMove></TbHandMove>
				<span className='md:hidden'>Moves</span>
			</h3>
			<span className='text-p-light block text-center w-full font-YellowCandy font-black text-[22px] md:text-[16px]'>
				{levelMoves.done}/{levelMoves.total}
			</span>
		</div>
	);
};

export default MoveCounter;
