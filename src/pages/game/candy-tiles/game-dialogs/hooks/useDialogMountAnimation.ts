import anime from 'animejs';
import useAudio from '../../../../../hooks/useAudio';

export default (targets: HTMLElement | string | (HTMLElement | string)[], options: anime.AnimeParams): (() => void) => {
	const playAudio = useAudio();

	const animateMount = () => {
		anime({
			targets,
			opacity: [0, 1],
			translateX: ['100%', '0%'],
			easing: 'easeOutBack',
			...options,
		});
		setTimeout(() => playAudio({ audioName: 'woosh1', volume: 0.25 }), 250);
	};

	return () => animateMount();
};
