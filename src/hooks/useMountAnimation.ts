import anime from 'animejs';
import { useEffect } from 'react';

export default (targets: HTMLElement | HTMLElement[] | string | string[]): void => {
	const animateComponentMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateY: [500, 0],
			easing: 'easeOutBack',
			duration: 300,
			endDelay: 200,
		});
	};

	useEffect(() => animateComponentMount(), []);
};
