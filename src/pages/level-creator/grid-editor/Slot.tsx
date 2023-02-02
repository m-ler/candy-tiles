import anime from 'animejs';
import { useEffect } from 'react';
import useAudio from '../../../hooks/useAudio';
import { randomNumber } from '../../../utils/math';

const animateSlotSpawn = (index: number) => {
	anime({
		targets: `[data-tile-slot][data-index="${index}"]`,
		scale: {
			value: [0, 1],
			duration: 100,
			easing: 'linear',
		},
		rotate: [45, 0],
		duration: 1000,
	});
};

type Props = {
	index: number;
	slotAvaliable: boolean;
};

const Slot = ({ index, slotAvaliable }: Props) => {
	const playAudio = useAudio();

	useEffect(() => {
		!!slotAvaliable && onSpawn();
	}, [slotAvaliable]);

	const onSpawn = () => {
		animateSlotSpawn(index);
		playAudio({ audioName: 'tileClick', speed: randomNumber(0.8, 1.3) });
	};

	return (
		<div
			data-tile-slot
			data-index={index}
			className={`border select-none hover:bg-white/10 ${slotAvaliable ? 'border-white/20' : 'border-white/5'}`}
		>
			{slotAvaliable ? <span className="bg-black/20 block h-full rounded pointer-events-none"></span> : <></>}
		</div>
	);
};

export default Slot;
