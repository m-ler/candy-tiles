import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import TargetItem from './TargetItem';
import { FaFlagCheckered } from 'react-icons/fa';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import TaskItem from './TaskItems';
import CandyTilesDialog from '../CandyTilesDialog';
import useSelectedLevel from '../../../../../hooks/useSelectedLevel';
import useAudio from '../../../../../hooks/useAudio';

const StartLevelDialog = () => {
	const selectedLevel = useSelectedLevel();
	const targetScore = useMemo(() => selectedLevel.data?.file.score || 0, [selectedLevel.data]);
	const targetIceTiles = useMemo(() => selectedLevel.data?.file.tasks.iceTiles || 0, [selectedLevel.data]);
	const targetRockTiles = useMemo(() => selectedLevel.data?.file.tasks.rockTiles || 0, [selectedLevel.data]);
	const targetIceCreams = useMemo(() => selectedLevel.data?.file.tasks.iceCreams || 0, [selectedLevel.data]);

	const [show, setShow] = useState(true);
	const playAudio = useAudio();

	const onStartClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		setShow(false);
	};

	return show ? (
		<CandyTilesDialog>
			<div className="flex flex-col w-full items-center gap-[12px]" data-cy="start-level-dialog">
				<span className="m-auto font-YellowCandy text-[24px] text-p-light">Target</span>

				<div className="flex flex-wrap gap-[12px]">
					<TargetItem>
						<div className="flex items-center gap-x-[10px]">
							<FaFlagCheckered className="text-s-light"></FaFlagCheckered>
							<span className="text-s-main font-YellowCandy text-[18px]">{targetScore} points</span>
						</div>
					</TargetItem>

					{targetIceTiles > 0 && (
						<TargetItem>
							<TaskItem spriteSrc={iceTileSprite} taskCount={targetIceTiles}></TaskItem>
						</TargetItem>
					)}
					{targetRockTiles > 0 && (
						<TargetItem>
							<TaskItem spriteSrc={rockTileSprite} taskCount={targetRockTiles}></TaskItem>
						</TargetItem>
					)}

					{targetIceCreams > 0 && (
						<TargetItem>
							<TaskItem spriteSrc={iceCreamSprite} taskCount={targetIceCreams}></TaskItem>
						</TargetItem>
					)}
				</div>

				<Button variant="contained" color="secondary" sx={{ fontWeight: 'bold' }} disableElevation onClick={onStartClick}>
					Start
				</Button>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default StartLevelDialog;
