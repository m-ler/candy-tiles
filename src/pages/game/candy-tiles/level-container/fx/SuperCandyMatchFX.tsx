import anime from 'animejs';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { COLUMN_NUMBER, ROW_NUMBER } from '../../../../../config';
import candyHexColors from '../../../../../data/candy-hex-colors';
import { getItemColumnIndex, getItemRowIndex } from '../../../../../game-algorithms/tile-matching';
import { levelFxListState } from '../../store/levelFxList';

type Props = {
	color: CandyColor;
	index: number;
	id: string;
};

const SuperCandyMatchFX = ({ color, index, id }: Props) => {
	const setLevelFxList = useSetRecoilState(levelFxListState);
	const fxElementRef = useRef<HTMLSpanElement | null>(null);
	const position = [(getItemColumnIndex(index) - 1) * 100, (getItemRowIndex(index) - 1) * 100];

	useEffect(() => {
		animateFx();
	}, []);

	const animateFx = (): void => {
		anime({
			targets: fxElementRef.current,
			opacity: [1, 0],
			scale: {
				value: [0, 1],
				duration: 300,
				easing: 'easeOutElastic',
			},
			duration: 500,
			easing: 'linear',
			complete: () => setLevelFxList((list) => list.filter((x) => x.id !== id)),
		});
	};

	return (
		<div
			className="absolute flex aspect-square opacity-60"
			style={{
				transform: `translate(${position[0]}%, ${position[1]}%)`,
				width: `calc(100%/${COLUMN_NUMBER})`,
				height: `calc(100%/${ROW_NUMBER})`,
			}}
		>
			<span
				ref={fxElementRef}
				className="relative block w-full h-full m-auto"
				style={{
					backgroundColor: candyHexColors[color],
				}}
			>
				<span
					className="absolute block w-[1500px] h-full bg-inherit translate-x-[-50%]"
					style={{
						backgroundColor: candyHexColors[color],
					}}
				></span>
				<span
					className="absolute block w-full h-[1500px] bg-inherit translate-y-[-50%]"
					style={{
						backgroundColor: candyHexColors[color],
					}}
				></span>
			</span>
		</div>
	);
};

export default SuperCandyMatchFX;
