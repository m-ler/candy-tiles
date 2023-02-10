import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import useAudio from '../../../../../hooks/useAudio';
import { clampNumber } from '../../../../../utils/math';

type Props = {
	spriteSrc: string;
	currentNumber: number;
	taskNumber: number;
};

const TaskItem = ({ spriteSrc, currentNumber, taskNumber }: Props) => {
	const [taskCompleted, setTaskCompleted] = useState(false);
	const playAudio = useAudio();

	useEffect(() => {
		setTaskCompleted(currentNumber >= taskNumber);
	}, [currentNumber]);

	useEffect(() => {
		taskCompleted && playAudio({ audioName: 'taskComplete' });
	}, [taskCompleted]);

	return (
		<div className="flex md:flex-col justify-center md:items-center gap-x-[20px] md:gap-y-[8px] bg-black/20 w-full rounded p-[8px]">
			<img src={spriteSrc} className="min-w-[22px] h-[22px]"></img>
			<span className="flex items-center gap-x-[5px]">
				<span className="text-[16px] md:text-[12px] text-p-light font-black font-YellowCandy">
					{clampNumber(currentNumber, 0, taskNumber)}/{taskNumber}
				</span>
				{taskCompleted && <MdCheckCircle className="text-[#1fe073]" size={'14px'}></MdCheckCircle>}
			</span>
		</div>
	);
};

export default TaskItem;
