import anime from 'animejs';
import { useEffect } from 'react';
import useWooshSFX from './useWooshSFX';

export default (targets: HTMLElement | HTMLElement[] | string | string[]): void => {
	const playWooshSFX = useWooshSFX();

	const animateComponentMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateY: [500, 0],
			easing: 'easeOutBack',
			duration: 300,
			endDelay: 200,
		});
		setTimeout(playWooshSFX, 50);
	};

	useEffect(() => animateComponentMount(), []);
};
