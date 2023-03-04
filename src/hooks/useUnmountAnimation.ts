import anime from 'animejs';

type UnmountAnimation = (onComplete?: () => void) => void;

export default (targets: HTMLElement | HTMLElement[] | string | string[]): UnmountAnimation => {
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
	};

	return (onComplete?: () => void) => animateUnmount(onComplete);
};
