import anime from 'animejs';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { COLUMN_NUMBER, ROW_NUMBER } from '../../../../../config';
import candyHexColors from '../../../../../data/candy-hex-colors';
import { getItemColumnIndex, getItemRowIndex } from '../../../../../game-algorithms/tile-matching';
import { levelFxListState } from '../../store/levelFxList';

type Props = {
	score: number;
	color: CandyColor;
	index: number;
	id: string;
};

const CandyScoreFX = ({ score, color, index, id }: Props) => {
	const setLevelFxList = useSetRecoilState(levelFxListState);
	const scoreElementRef = useRef<HTMLElement | null>(null);
	const position = [(getItemColumnIndex(index) - 1) * 100, (getItemRowIndex(index) - 1) * 100];

	useEffect(() => {
		animateScore();
	}, []);

	const animateScore = (): void => {
		anime({
			targets: scoreElementRef.current,
			translateY: ['0%', '-100%'],
			opacity: [1, 0],
			duration: 500,
			easing: 'linear',
			complete: () => setLevelFxList((list) => list.filter((x) => x.id !== id)),
		});
	};

	return (
		<div
			className="absolute flex"
			style={{
				transform: `translate(${position[0]}%, ${position[1]}%)`,
				width: `calc(100%/${COLUMN_NUMBER})`,
				height: `calc(100%/${ROW_NUMBER})`,
			}}
		>
			<span
				ref={scoreElementRef}
				className="text-[200%] font-bold text-center m-auto font-YellowCandy"
				style={{
					color: candyHexColors[color],
				}}
			>
				{score}
			</span>
		</div>
	);
};

export default CandyScoreFX;
