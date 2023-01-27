import anime from 'animejs';
import useAudio from '../../../../../hooks/useAudio';

export default (targets: HTMLElement | string | (HTMLElement | string)[]): ((options: anime.AnimeParams) => void) => {
	const playAudio = useAudio();

	const animateUnmount = (options: anime.AnimeParams) => {
		anime({
			targets,
			translateX: ['0%', '-100%'],
			opacity: 0,
			easing: 'easeInBack',
			...options,
		});
		setTimeout(() => playAudio({ audioName: 'woosh1', volume: 0.25 }), 250);
	};

	return (options: anime.AnimeParams) => animateUnmount(options);
};
