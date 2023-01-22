import anime from 'animejs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { possibleCombinationsState } from '../../atoms/possibleCombinations';
import CandyTilesDialog from '../CandyTilesDialog';
import GameOverActions from '../GameOverActions';

const animateStart = () => {
	anime({
		targets: '#no-possible-combinations-dialog',
		opacity: [0, 1],
		translateX: ['100%', '0%'],
		easing: 'easeOutBack',
		duration: 500,
		delay: 500,
	});
};

const NoPossibleCombinationsDialog = () => {
	const possibleCombinations = useRecoilValue(possibleCombinationsState);

	useEffect(() => {
		!possibleCombinations && animateStart();
	}, [possibleCombinations]);

	return possibleCombinations ? (
		<></>
	) : (
		<CandyTilesDialog id="no-possible-combinations-dialog">
			<div className="flex flex-col w-full items-center gap-[12px]">
				<div>
					<span className="m-auto font-YellowCandy text-[22px] block text-center text-p-light">No moves!</span>
					<span className="m-auto font-YellowCandy text-[18px] block text-center text-s-light">You ran out of possible combinations!</span>
				</div>
				<GameOverActions dialogID="no-possible-combinations-dialog"></GameOverActions>
			</div>
		</CandyTilesDialog>
	);
};

export default NoPossibleCombinationsDialog;
