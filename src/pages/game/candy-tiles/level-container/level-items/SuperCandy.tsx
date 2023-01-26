import superRed from './../../../../../assets/img/candies/super-red.png';
import superOrange from './../../../../../assets/img/candies/super-orange.png';
import superYellow from './../../../../../assets/img/candies/super-yellow.png';
import superGreen from './../../../../../assets/img/candies/super-green.png';
import superBlue from './../../../../../assets/img/candies/super-blue.png';
import superPurple from './../../../../../assets/img/candies/super-purple.png';
import superCandyMatchSFX from './../../../../../assets/audio/superCandyMatch.mp3';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { levelItemsState } from '../../atoms/levelItems';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import anime from 'animejs';
import { scoreState } from '../../atoms/score';
import { levelFxListState } from '../../atoms/levelFxList';
import uuid from 'react-uuid';

const candyImages: { [key: string]: string } = {
	'Red': superRed,
	'Orange': superOrange,
	'Yellow': superYellow,
	'Green': superGreen,
	'Blue': superBlue,
	'Purple': superPurple,
};

const superCandyMatchSound = new Audio(superCandyMatchSFX);

export const CandyColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

const animateItemSpawn = (element: HTMLElement): void => {
	anime({
		targets: element,
		scale: [0, 1],
		rotate: [180, -5],
		easing: 'easeOutBack',
		duration: 750,
	});
};

const SUPER_CANDY_SCORE = 30;

type SuperCandyProps = {
	color: CandyColor;
	id: string;
	index: number;
};

const SuperCandy = ({ color, id, index }: SuperCandyProps) => {
	const [show, setShow] = useState(true);
	const itemUsedRef = useRef(false);
	const elementRef = useRef<HTMLImageElement | null>(null);
	const levelItems = useRecoilValue(levelItemsState);
	const setScore = useSetRecoilState(scoreState);
	const setLevelFxList = useSetRecoilState(levelFxListState);

	useEffect(() => {
		animateItemSpawn(elementRef.current as HTMLElement);
	}, []);

	useEffectAfterMount(() => {
		const itemMatched = !levelItems.some((x) => x?.id === id);
		itemMatched && !itemUsedRef.current && onItemMatch();
	}, [levelItems]);

	const onItemMatch = () => {
		itemUsedRef.current = true;
		setShow(false);
		setScore((score) => score + SUPER_CANDY_SCORE);
		superCandyMatchSound.play();
		setLevelFxList((list) => [
			...list,
			{
				type: 'Score',
				color,
				id: uuid(),
				index,
				score: SUPER_CANDY_SCORE,
			} as ScoreFx,
			{
				type: 'SuperCandy',
				color,
				id: uuid(),
				index,
			} as SuperCandyFX,
		]);
	};

	return (
		<img
			ref={elementRef}
			data-candy
			data-color={color}
			src={candyImages[color]}
			className="w-full h-full m-0 select-none pointer-events-none"
			style={{
				display: show ? 'block' : 'none',
			}}
		></img>
	);
};

export default SuperCandy;
