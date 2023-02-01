import anime from 'animejs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAudio from '../../../hooks/useAudio';
import { randomNumber } from '../../../utils/math';
import { elementListEditorState } from '../atoms/elementListEditor';

type Props = {
	index: number;
};

const animateElementSpawn = (elementId: string) => {
	anime({
		targets: `#${elementId}`,
		scale: [0, 1],
		easing: 'easeOutElastic',
		duration: 1000,
	});
};

const TileElement = ({ index }: Props) => {
	const tileElement = useRecoilValue(elementListEditorState)[index];
	const elementId = `editor-element-${index}`;
	const playAudio = useAudio();

	useEffect(() => {
		!!tileElement && onSpawn();
	}, [tileElement]);

	const onSpawn = () => {
		animateElementSpawn(elementId);
		playAudio({ audioName: 'pop1', speed: randomNumber(0.8, 1.3) });
	};

	return tileElement ? <img id={elementId} src={tileElement.spriteSrc} className="p-[12%]"></img> : <div></div>;
};

export default TileElement;
