import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelCompleteState } from '../../selectors/levelComplete';
import CandyTilesDialog from '../CandyTilesDialog';
import useDialogMountAnimation from '../hooks/useDialogMountAnimation';

const LevelCompleteDialog = () => {
	const levelComplete = useRecoilValue(levelCompleteState);
	const animateMount = useDialogMountAnimation('#level-complete-dialog', { duration: 500, delay: 500 });

	useEffect(() => {
		levelComplete && onLevelComplete();
	}, [levelComplete]);

	const onLevelComplete = () => {
		animateMount();
	}; 

	return levelComplete ? (
		<CandyTilesDialog id="level-complete-dialog">
			<div className="flex flex-col w-full items-center gap-[12px]">
				<div>
					<span className="m-auto font-YellowCandy text-[22px] block text-center text-p-light">Level complete!</span>
				</div>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default LevelCompleteDialog;
