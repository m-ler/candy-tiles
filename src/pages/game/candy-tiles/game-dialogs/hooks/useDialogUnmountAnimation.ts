import anime from 'animejs';

export default (targets: HTMLElement | string | (HTMLElement | string)[]): ((options: anime.AnimeParams) => void) => {
	const animateUnmount = (options: anime.AnimeParams) => {
		anime({
			targets,
			translateX: ['0%', '-100%'],
			opacity: 0,
			easing: 'easeInBack',
			...options,
		});
	};

	return (options: anime.AnimeParams) => animateUnmount(options);
};
