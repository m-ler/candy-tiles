import iceTileSprite from './../../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../../assets/img/tiles/rock.png';
import iceCreamSprite from './../../../../assets/img/candies/ice-cream.png';
import TaskItem from './TaskItem';
import { useRecoilValue } from 'recoil';
import { levelTasksState } from '../atoms/levelTasks';

const LevelTasks = () => {
	const levelTasks = useRecoilValue(levelTasksState);

	return (
		<div className='flex flex-col gap-y-[10px] bg-s-dark rounded-lg p-[12px] w-full'>
			<TaskItem spriteSrc={iceTileSprite} currentNumber={levelTasks.iceTiles} taskNumber={5}></TaskItem>
			<TaskItem spriteSrc={rockTileSprite} currentNumber={levelTasks.rockTiles} taskNumber={4}></TaskItem>
			<TaskItem spriteSrc={iceCreamSprite} currentNumber={levelTasks.iceCreams} taskNumber={6}></TaskItem>
		</div>
	);
};

export default LevelTasks;
