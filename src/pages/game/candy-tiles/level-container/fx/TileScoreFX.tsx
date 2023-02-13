import anime from 'animejs';
import { useEffect, useRef } from 'react';
import { COLUMN_NUMBER, ROW_NUMBER } from '../../../../../config';
import { getItemColumnIndex, getItemRowIndex } from '../../../../../game-algorithms/tile-matching';
import { useSetRecoilState } from 'recoil';
import { levelFxListState } from './../../store/levelFxList';

type Props = {
	score: number;
	index: number;
	id: string;
};

const TileScoreFX = ({ score, index, id }: Props) => {
	const setLevelFxList = useSetRecoilState(levelFxListState);
	const position = [(getItemColumnIndex(index) - 1) * 100, (getItemRowIndex(index) - 1) * 100];
	const elementRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		animateScore();
	}, []);

	const animateScore = (): void => {
		anime({
			targets: elementRef.current,
			translateY: ['0%', '-50%'],
			opacity: [0.7, 0],
			duration: 700,
			easing: 'linear',
			delay: 200,
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
			<span ref={elementRef} className="text-[170%] font-bold text-center m-auto font-YellowCandy text-p-light">
				{score}
			</span>
		</div>
	);
};

export default TileScoreFX;
