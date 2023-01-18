import { Button } from '@mui/material';
import anime from 'animejs';
import { useEffect, useRef, useState } from 'react';
import TargetItem from './TargetItem';
import { FaFlagCheckered } from 'react-icons/fa';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import TaskItem from './TaskItems';

const animateStart = (element: HTMLElement) => {
	anime({
		targets: element,
		opacity: [0, 1],
		translateX: ['100%', '0%'],
		easing: 'easeOutBack',
		duration: 1000,
		delay: 300,
	});
};

const animateEnd = (element: HTMLElement, onComplete: () => void) => {
	anime({
		targets: element,
		translateX: ['0%', '-100%'],
		opacity: 0,
		easing: 'easeInBack',
		duration: 300,
		complete: onComplete,
	});
};

const StartLevelDialog = () => {
	const [show, setShow] = useState(true);
	const popupElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animateStart(popupElementRef.current as HTMLElement);
	}, []);

	const onStart = () => {
		animateEnd(popupElementRef.current as HTMLElement, () => setShow(false));
	};

	return show ? (
		<div className='absolute top-0 left-0 w-full h-full flex overflow-hidden p-[16px]'>
			<div
				ref={popupElementRef}
				className='bg-p-dark w-full h-min m-auto flex flex-col items-center rounded-md p-[16px] gap-y-[12px] shadow-2xl border border-p-main'
			>
				<span className='m-auto font-YellowCandy text-[24px] text-p-light'>Target</span>

				<div className='flex flex-wrap gap-[12px]'>
					<TargetItem>
						<div className='flex items-center gap-x-[10px]'>
							<FaFlagCheckered className='text-s-light'></FaFlagCheckered>
							<span className='text-s-main font-YellowCandy text-[18px]'>10000 points</span>
						</div>
					</TargetItem>

					<TargetItem>
						<TaskItem spriteSrc={iceTileSprite} taskCount={4}></TaskItem>
					</TargetItem>

					<TargetItem>
						<TaskItem spriteSrc={rockTileSprite} taskCount={5}></TaskItem>
					</TargetItem>

					<TargetItem>
						<TaskItem spriteSrc={iceCreamSprite} taskCount={2}></TaskItem>
					</TargetItem>
				</div>

				<Button variant='contained' color='secondary' sx={{ fontWeight: 'bold' }} onClick={onStart}>
					Start
				</Button>
			</div>
		</div>
	) : (
		<></>
	);
};

export default StartLevelDialog;
