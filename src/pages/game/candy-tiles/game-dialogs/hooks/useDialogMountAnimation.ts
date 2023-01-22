import anime from 'animejs';
import useWooshSFX from '../../../../../hooks/useWooshSFX';

export default (targets: HTMLElement | string | (HTMLElement | string)[], options: anime.AnimeParams): (() => void) => {
	const playWooshSFX = useWooshSFX();

	const animateMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateX: ['100%', '0%'],
			easing: 'easeOutBack',
			...options,
		});
		setTimeout(playWooshSFX, 250)
	};

	return () => animateMount();
};
