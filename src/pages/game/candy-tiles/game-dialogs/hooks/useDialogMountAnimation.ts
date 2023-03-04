import anime from 'animejs';

export default (targets: HTMLElement | string | (HTMLElement | string)[], options: anime.AnimeParams): (() => void) => {
	const animateMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateX: ['100%', '0%'],
			easing: 'easeOutBack',
			...options,
		});
	};

	return () => animateMount();
};
