import anime from 'animejs';
import { useEffect } from 'react';
import useAudio from './useAudio';

export default (targets: HTMLElement | HTMLElement[] | string | string[]): void => {
	const playAudio = useAudio();

	const animateComponentMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateY: [500, 0],
			easing: 'easeOutBack',
			duration: 300,
			endDelay: 200,
		});
		setTimeout(() => playAudio({ audioName: 'woosh1', volume: 0.25 }), 50);
	};

	useEffect(() => animateComponentMount(), []);
};
