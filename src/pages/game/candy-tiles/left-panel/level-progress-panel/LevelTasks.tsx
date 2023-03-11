import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import TaskItem from './TaskItem';
import { useRecoilValue } from 'recoil';
import { levelTasksState } from '../../store/levelTasks';
import useSelectedLevel from '../../../../../hooks/useSelectedLevel';
import { useMemo } from 'react';

const LevelTasks = () => {
	const selectedLevel = useSelectedLevel();
	const targetIceTiles = useMemo(() => selectedLevel.data?.file.tasks.iceTiles || 0, [selectedLevel.data]);
	const targetRockTiles = useMemo(() => selectedLevel.data?.file.tasks.rockTiles || 0, [selectedLevel.data]);
	const targetIceCreams = useMemo(() => selectedLevel.data?.file.tasks.iceCreams || 0, [selectedLevel.data]);
	const tasksAvaliable = [targetIceTiles, targetRockTiles, targetIceCreams].some((x) => x > 0);

	const levelTasks = useRecoilValue(levelTasksState);

	return tasksAvaliable ? (
		<div className="flex flex-col md:flex-row md:grow gap-[10px] bg-s-dark rounded-lg p-[12px] w-full">
			{targetIceTiles > 0 && (
				<TaskItem spriteSrc={iceTileSprite} currentNumber={levelTasks.iceTiles} taskNumber={targetIceTiles}></TaskItem>
			)}

			{targetRockTiles > 0 && (
				<TaskItem spriteSrc={rockTileSprite} currentNumber={levelTasks.rockTiles} taskNumber={targetRockTiles}></TaskItem>
			)}

			{targetIceCreams > 0 && (
				<TaskItem spriteSrc={iceCreamSprite} currentNumber={levelTasks.iceCreams} taskNumber={targetIceCreams}></TaskItem>
			)}
		</div>
	) : (
		<></>
	);
};

export default LevelTasks;
