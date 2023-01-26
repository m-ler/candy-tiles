import { useRef, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { levelItemsState } from '../../atoms/levelItems';
import { scoreState } from '../../atoms/score';
import { levelFxListState } from '../../atoms/levelFxList';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import iceCreamMatchSFX from './../../../../../assets/audio/iceCreamMatch.mp3';
import { levelTasksState } from '../../atoms/levelTasks';

const ICE_CREAM_SCORE = 100;
type IceCreamProps = {
	id: string;
	index: number;
};

const playIceCreamMatch = () => {
	const iceCreamMatchSound = new Audio(iceCreamMatchSFX);
	iceCreamMatchSound.play();
};

const IceCream = ({ id, index }: IceCreamProps) => {
	const [show, setShow] = useState(true);
	const elementRef = useRef<HTMLImageElement | null>(null);
	const itemUsedRef = useRef(false);
	const levelItems = useRecoilValue(levelItemsState);
	const setScore = useSetRecoilState(scoreState);
	const setLevelFxList = useSetRecoilState(levelFxListState);
	const setLevelTasks = useSetRecoilState(levelTasksState);

	useEffectAfterMount(() => {
		const itemMatched = !levelItems.some((x) => x?.id === id);
		itemMatched && !itemUsedRef.current && onItemMatch();
	}, [levelItems]);

	const onItemMatch = () => {
		itemUsedRef.current = true;
		playIceCreamMatch();
		setShow(false);
		setScore((score) => score + ICE_CREAM_SCORE);
		setLevelFxList((list) => [
			...list,
			{
				type: 'Score',
				color: 'White',
				id: uuid(),
				index,
				score: ICE_CREAM_SCORE,
			} as ScoreFx,
		]);

		setLevelTasks((tasks) => ({
			...tasks,
			iceCreams: tasks.iceCreams + 1,
		}));
	};

	return (
		<img
			data-ice-cream
			ref={elementRef}
			src={iceCreamSprite}
			className="w-full h-full m-0 select-none pointer-events-none duration-200"
			style={{
				display: show ? 'block' : 'none',
			}}
		></img>
	);
};

export default IceCream;
