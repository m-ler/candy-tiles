import anime from 'animejs';
import useAudio from './useAudio';

type UnmountAnimation = (onComplete?: () => void) => void;

export default (targets: HTMLElement | HTMLElement[] | string | string[]): UnmountAnimation => {
	const playAudio = useAudio();

	const animateUnmount = (onComplete?: () => void) => {
		anime({
			targets: targets,
			opacity: [1, 0],
			translateY: [0, 500],
			easing: 'easeInBack',
			duration: 300,
			endDelay: 200,
			complete: onComplete,
		});
		setTimeout(() => playAudio({ audioName: 'woosh1', volume: 0.25 }), 250);
	};

	return (onComplete?: () => void) => animateUnmount(onComplete);
};
