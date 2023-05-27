import chocolateSprite from './../../../../../assets/img/candies/chocolate.png';
import { useEffect, useRef, useState, useMemo } from 'react';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { useRecoilValue } from 'recoil';
import { levelItemsState } from '../../store/levelItems';
import anime, { AnimeInstance } from 'animejs';
import useAudio from '../../../../../hooks/useAudio';
import useScore from '../../hooks/useScore';

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
	const playAudio = useAudio();
	const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
	useScore(matched, index, 'Chocolate');

	useEffect(() => {
		animateItemSpawn(elementRef.current as HTMLElement, () => {
			spinAnimationRef.current = animateChocolateScale(elementRef.current as HTMLElement);
		});

		return () => {
			anime.remove(spinAnimationRef.current);
		};
	}, []);

	useEffectAfterMount(() => {
		matched && !itemUsedRef.current && onItemMatch();
	}, [levelItems]);

	const onItemMatch = () => {
		itemUsedRef.current = true;
		setShow(false);
		playAudio({ audioName: 'chocolateMatch', volume: 0.5 });
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
