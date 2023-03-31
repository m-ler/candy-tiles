import anime from 'animejs';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';

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
	useEffectAfterMount(() => {
		!!slotAvaliable && onSpawn();
	}, [slotAvaliable]);

	const onSpawn = () => {
		animateSlotSpawn(index);
	};

	return (
		<div
			data-cy="grid-editor-slot"
			data-tile-slot
			data-index={index}
			className={`border select-none hover:bg-white/10 ${slotAvaliable ? 'border-white/20' : 'border-white/5'}`}
		>
			{slotAvaliable ? <span className="bg-black/20 block h-full rounded pointer-events-none"></span> : <></>}
		</div>
	);
};

export default Slot;
