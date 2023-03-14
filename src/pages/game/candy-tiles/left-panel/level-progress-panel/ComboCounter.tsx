import { useRecoilValue } from 'recoil';
import { comboCountState } from './../../store/comboCount';
import { useEffect } from 'react';
import anime from 'animejs';
import { Tooltip } from '@mui/material';

const ComboCounter = () => {
	const comboCount = useRecoilValue(comboCountState);

	useEffect(() => {
		animateCounter();
	}, [comboCount]);

	const animateCounter = () => {
		const show = comboCount > 1;
		anime({
			targets: '#combo-counter',
			rotate: 15,
			translateX: '-50%',
			scale: show ? [0, 1] : 0,
			easing: show ? 'easeOutElastic' : 'easeInExpo',
			duration: show ? 500 : 200,
		});
	};

	return (
		<Tooltip title="Combo">
			<span
				id="combo-counter"
				className="select-none absolute left-[100%] bottom-[50%] rounded px-[7px] py-[5px] bg-s-main font-black text-s-dark text-[12px]"
			>
				{comboCount}x
			</span>
		</Tooltip>
	);
};

export default ComboCounter;
