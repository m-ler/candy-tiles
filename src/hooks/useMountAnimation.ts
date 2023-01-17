import anime from 'animejs';
import { useEffect } from 'react';

const animateComponentMount = (targets: HTMLElement | HTMLElement[] | string | string[]) => {
	anime({
		targets,
		opacity: [0, 1],
		translateY: [500, 0],
		easing: 'easeOutBack',
		duration: 300,
		endDelay: 200,
	});
};

export default (targets: HTMLElement | HTMLElement[] | string | string[]): void => {
	useEffect(() => animateComponentMount(targets), []);
};
