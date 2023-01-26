import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import useTaskCompleteSFX from '../../../../hooks/useTaskCompleteSFX';
import { clampNumber } from '../../../../utils/math';

type Props = {
	spriteSrc: string;
	currentNumber: number;
	taskNumber: number;
};

const TaskItem = ({ spriteSrc, currentNumber, taskNumber }: Props) => {
	const [taskCompleted, setTaskCompleted] = useState(false);
	const playTaskCompleteSFX = useTaskCompleteSFX();

	useEffect(() => {
		setTaskCompleted(currentNumber >= taskNumber);
	}, [currentNumber]);

	useEffect(() => {
		taskCompleted && playTaskCompleteSFX();
	}, [taskCompleted]);

	return (
		<div className="flex justify-center gap-x-[20px] bg-black/20 w-full rounded p-[8px]">
			<img src={spriteSrc} className="h-[22px]"></img>
			<span className="flex items-center gap-x-[5px]">
				<span className="text-[16px] text-p-light font-black font-YellowCandy">
					{clampNumber(currentNumber, 0, taskNumber)}/{taskNumber}
				</span>
				{taskCompleted && <MdCheckCircle className="text-[#1fe073]" size={'14px'}></MdCheckCircle>}
			</span>
		</div>
	);
};

export default TaskItem;
