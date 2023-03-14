import anime from 'animejs';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';
import { LevelEditorElement } from '../types';

const animateTileSpawn = (index: number) => {
	anime({
		targets: `[data-tile][data-index="${index}"]>img`,
		translateY: ['-50%', 0],
		scale: [2, 1],
		duration: 350,
		easing: 'easeOutExpo',
	});
};

type Props = {
	index: number;
	tileObj: LevelEditorElement | null;
	slotAvaliable: boolean;
};

const Tile = ({ index, tileObj, slotAvaliable }: Props) => {
	useEffectAfterMount(() => {
		!!tileObj && onSpawn();
	}, [tileObj]);

	const onSpawn = () => {
		animateTileSpawn(index);
	};

	return (
		<div
			data-tile
			data-index={index}
			className="select-none hover:border-[5px] hover:border-s-main/50 hover:bg-s-main/10 box-border "
			style={{
				pointerEvents: slotAvaliable ? 'inherit' : 'none',
			}}
		>
			{tileObj ? <img src={tileObj.spriteSrc} className="pointer-events-none"></img> : <></>}
		</div>
	);
};

export default Tile;
