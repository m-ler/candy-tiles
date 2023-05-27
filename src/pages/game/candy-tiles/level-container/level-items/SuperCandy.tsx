import superRed from './../../../../../assets/img/candies/super-red.png';
import superOrange from './../../../../../assets/img/candies/super-orange.png';
import superYellow from './../../../../../assets/img/candies/super-yellow.png';
import superGreen from './../../../../../assets/img/candies/super-green.png';
import superBlue from './../../../../../assets/img/candies/super-blue.png';
import superPurple from './../../../../../assets/img/candies/super-purple.png';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { levelItemsState } from '../../store/levelItems';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import anime from 'animejs';
import { levelFxListState } from '../../store/levelFxList';
import uuid from 'react-uuid';
import useAudio from '../../../../../hooks/useAudio';
import useScore from '../../hooks/useScore';
import { CandyColor, SuperCandyFX } from '../../types';

const candyImages: { [key: string]: string } = {
	'Red': superRed,
	'Orange': superOrange,
	'Yellow': superYellow,
	'Green': superGreen,
	'Blue': superBlue,
	'Purple': superPurple,
};

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
	const setLevelFxList = useSetRecoilState(levelFxListState);
	const playAudio = useAudio();
	const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
	useScore(matched, index, 'SuperCandy', color);

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
		playAudio({ audioName: 'superCandyMatch' });
		setLevelFxList((list) => [
			...list,
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
