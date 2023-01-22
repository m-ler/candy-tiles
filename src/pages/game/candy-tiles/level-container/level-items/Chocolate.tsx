import chocolateSprite from './../../../../../assets/img/candies/chocolate.png';
import { useEffect, useRef, useState } from 'react';
import chocolateMatchSFX from './../../../../../assets/audio/chocolateMatch.mp3';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { levelItemsState } from '../../atoms/levelItems';
import anime, { AnimeInstance } from 'animejs';
import { scoreState } from '../../atoms/score';
import { levelFxListState } from '../../atoms/levelFxList';
import uuid from 'react-uuid';

const chocolateMatchSound = new Audio(chocolateMatchSFX);
chocolateMatchSound.volume = 0.5;

const animateItemSpawn = (element: HTMLElement, onComplete: () => void): void => {
	anime({
		targets: element,
		scale: [0, 1.2, 1],
		easing: 'easeOutBack',
		duration: 500,
		complete: onComplete,
	});
};

const animateChocolateScale = (element: HTMLElement): AnimeInstance => {
	const animation = anime({
		targets: element,
		rotate: [0, 360],
		duration: 30000,
		loop: true,
		easing: 'linear',
		direction: 'normal',
	});

	return animation;
};

const CHOCHOLATE_SCORE = 100;

type ChocolateProps = {
	id: string;
	index: number;
};

const Chocolate = ({ id, index }: ChocolateProps) => {
	const [show, setShow] = useState(true);
	const itemUsedRef = useRef(false);
	const levelItems = useRecoilValue(levelItemsState);
	const elementRef = useRef<HTMLImageElement | null>(null);
	const spinAnimationRef = useRef<null | AnimeInstance>(null);
	const setScore = useSetRecoilState(scoreState);
	const setLevelFxList = useSetRecoilState(levelFxListState);

	useEffect(() => {
		animateItemSpawn(elementRef.current as HTMLElement, () => {
			spinAnimationRef.current = animateChocolateScale(elementRef.current as HTMLElement);
		});

		return () => {
			anime.remove(spinAnimationRef.current);
		};
	}, []);

	useEffectAfterMount(() => {
		const itemMatched = !levelItems.some((x) => x?.key === id);
		if (itemMatched && !itemUsedRef.current) onItemMatch();
	}, [levelItems]);

	const onItemMatch = () => {
		itemUsedRef.current = true;
		setShow(false);
		setScore((score) => score + CHOCHOLATE_SCORE);
		chocolateMatchSound.play();
		setLevelFxList((list) => [
			...list,
			{
				type: 'Score',
				color: 'White',
				key: uuid(),
				index,
				score: CHOCHOLATE_SCORE,
			} as ScoreFx,
		]);
	};

	return (
		<img
			data-chocolate
			ref={elementRef}
			src={chocolateSprite}
			className="w-full h-full m-0 select-none pointer-events-none"
			style={{
				display: show ? 'block' : 'none',
			}}
		></img>
	);
};

export default Chocolate;
