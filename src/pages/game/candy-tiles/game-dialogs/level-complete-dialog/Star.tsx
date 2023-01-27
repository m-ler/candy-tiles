import anime from 'animejs';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const animateStar = (starId: string) => {
	anime({
		targets: `#${starId}`,
		scale: [3, 1],
		opacity: [0, 1],
		color: '#ffcd29',
		easing: 'easeOutBack',
		duration: 300,
		delay: 1000,
	});
};

type Props = {
	id: string;
};
const Star = ({ id }: Props) => {
	useEffect(() => {
		animateStar(id);
	}, []);

	return <FaStar className="w-[50px] h-full text-black/25" id={id}></FaStar>;
};

export default Star;
