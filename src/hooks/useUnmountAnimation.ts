import anime from 'animejs';

const animateUnmount = (targets: HTMLElement | HTMLElement[] | string | string[], onComplete?: () => void) => {
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

type UnmountAnimation = (onComplete?: () => void) => void;

export default (targets: HTMLElement | HTMLElement[] | string | string[]): UnmountAnimation => {
	return (onComplete?: () => void) => animateUnmount(targets, onComplete);
};
