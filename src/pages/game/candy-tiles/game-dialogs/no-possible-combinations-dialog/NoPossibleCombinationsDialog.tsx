import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { possibleCombinationsState } from '../../atoms/possibleCombinations';
import CandyTilesDialog from '../CandyTilesDialog';
import GameOverActions from '../GameOverActions';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';
import useGameOverSFX from '../hooks/useGameOverSFX';

const NoPossibleCombinationsDialog = () => {
	const possibleCombinations = useRecoilValue(possibleCombinationsState);
	const animateMount = useDialogMountAnimation('#no-possible-combinations-dialog', { duration: 500, delay: 600 });
	const playGameOverSFX = useGameOverSFX();

	useEffect(() => {
		!possibleCombinations && onRanOutOfPossibleCombinations();
	}, [possibleCombinations]);

	const onRanOutOfPossibleCombinations = () => {
		animateMount();
		playGameOverSFX();
	};

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
