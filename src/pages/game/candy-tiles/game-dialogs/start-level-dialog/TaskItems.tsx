type Props = {
	spriteSrc: string;
	taskCount: number;
};

const TaskItem = ({ spriteSrc, taskCount }: Props) => {
	return (
		<div className='flex items-center gap-x-[10px]'>
			<img src={spriteSrc} className='h-[24px]'></img>
			<span className='text-s-main font-YellowCandy text-[18px]'>{taskCount}</span>
		</div>
	);
};

export default TaskItem;
