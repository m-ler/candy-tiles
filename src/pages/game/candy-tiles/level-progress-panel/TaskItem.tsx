type Props = {
	spriteSrc: string;
	currentNumber: number;
	taskNumber: number;
};

const TaskItem = ({ spriteSrc, currentNumber, taskNumber }: Props) => {
	return (
		<div className='flex justify-center gap-x-[20px] bg-black/20 w-full rounded p-[8px]'>
			<img src={spriteSrc} className='h-[22px]'></img>
			<span className='text-[16px] text-p-light font-black font-YellowCandy'>
				{currentNumber}/{taskNumber}
			</span>
		</div>
	);
};

export default TaskItem;
