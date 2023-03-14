import anime from 'animejs';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';
import { LevelEditorElement } from '../types';

const animateItemSpawn = (index: number) => {
	anime({
		targets: `[data-item][data-index="${index}"]>img`,
		translateY: ['-50%', 0],
		scale: [0, 1],
		duration: 1000,
		easing: 'easeOutElastic',
	});
};

type Props = {
	index: number;
	itemObj: LevelEditorElement | null;
	slotAvaliable: boolean;
};

const Item = ({ index, itemObj, slotAvaliable }: Props) => {
	useEffectAfterMount(() => {
		!!itemObj && onSpawn();
	}, [itemObj]);

	const onSpawn = () => {
		animateItemSpawn(index);
	};

	return (
		<div
			data-item
			data-index={index}
			className=" p-[15%] select-none hover:border-[5px] hover:border-t-main/50 hover:bg-s-main/10"
			style={{
				pointerEvents: slotAvaliable ? 'inherit' : 'none',
			}}
		>
			{itemObj ? <img src={itemObj.spriteSrc} className="pointer-events-none"></img> : <></>}
		</div>
	);
};

export default Item;
