import anime from 'animejs';
import useWooshSFX from '../../../../../hooks/useWooshSFX';

export default (targets: HTMLElement | string | (HTMLElement | string)[]): ((options: anime.AnimeParams) => void) => {
	const playWooshSFX = useWooshSFX();
	
	const animateUnmount = (options: anime.AnimeParams) => {
		anime({
			targets,
			translateX: ['0%', '-100%'],
			opacity: 0,
			easing: 'easeInBack',
			...options,
		});
		setTimeout(playWooshSFX, 250);
	};

	return (options: anime.AnimeParams) => animateUnmount(options);
};
