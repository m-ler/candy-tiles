import { Button } from '@mui/material';
import anime from 'animejs';
import { useEffect, useState } from 'react';
import TargetItem from './TargetItem';
import { FaFlagCheckered } from 'react-icons/fa';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import TaskItem from './TaskItems';
import CandyTilesDialog from '../CandyTilesDialog';

const animateStart = () => {
	anime({
		targets: '#start-level-dialog',
		opacity: [0, 1],
		translateX: ['100%', '0%'],
		easing: 'easeOutBack',
		duration: 500,
		delay: 300,
	});
};

const animateEnd = (onComplete: () => void) => {
	anime({
		targets: '#start-level-dialog',
		translateX: ['0%', '-100%'],
		opacity: 0,
		easing: 'easeInBack',
		duration: 300,
		complete: onComplete,
	});
};

const StartLevelDialog = () => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		animateStart();
	}, []);

	const onStart = () => {
		animateEnd(() => setShow(false));
	};

	return show ? (
		<CandyTilesDialog id='start-level-dialog'>
			<div className='flex flex-col w-full items-center gap-[12px]'>
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
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default StartLevelDialog;
