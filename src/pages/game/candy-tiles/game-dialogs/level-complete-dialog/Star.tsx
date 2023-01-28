import anime from 'animejs';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import useAudio from '../../../../../hooks/useAudio';

const animateStar = (starId: string, delay: number) => {
	anime({
		targets: `#${starId}`,
		scale: [8, 1],
		rotate: [180, 0],
		opacity: {
			value: [0, 1],
			duration: 200,
		},
		color: '#ffcd29',
		easing: 'easeOutBack',
		duration: 800,
		delay,
	});
};

type Props = {
	id: string;
	animationDelayMs: number;
	lit: boolean;
};
const Star = ({ id, animationDelayMs, lit }: Props) => {
	const playAudio = useAudio();
	useEffect(() => {
		lit && animateStar(id, animationDelayMs);
		lit && setTimeout(() => playAudio({ audioName: 'starScore' }), animationDelayMs);
	}, []);

	return <FaStar className="w-[30px] h-full text-black/25" id={id}></FaStar>;
};

export default Star;
