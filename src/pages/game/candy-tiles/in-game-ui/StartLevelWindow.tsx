import { Button } from '@mui/material';
import anime from 'animejs';
import { useEffect, useRef, useState } from 'react';

const animateStart = (element: HTMLElement) => {
	anime({
		targets: element,
		translateY: ['-500%', '0%'],
		easing: 'easeOutCirc',
		duration: 300,
	});
};

const animateEnd = (element: HTMLElement, onComplete: () => void) => {
	anime({
		targets: element,
		translateY: ['0%', '500%'],
		opacity: 0,
		easing: 'easeInBack',
		duration: 300,
		complete: onComplete,
	});
};

const StartLevelWindow = () => {
	const [show, setShow] = useState(true);
	const popupElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animateStart(popupElementRef.current as HTMLElement);
	}, []);

	const onStart = () => {
		animateEnd(popupElementRef.current as HTMLElement, () => setShow(false));
	};

	return show ? ( 
		<div className='absolute top-0 left-0 w-full h-full flex bg-black/20 overflow-hidden'>
			<div
				ref={popupElementRef}
				className='bg-white w-[min(100%,500px)] h-min m-auto flex flex-col items-center rounded-md p-[16px] gap-y-[12px]'
			>
				<span className='m-auto font-YellowCandy text-[22px]'>Level 1</span>

				<Button variant='contained' onClick={onStart}>
					Start
				</Button>
			</div>
		</div>
	) : (
		<></>
	);
};

export default StartLevelWindow;
