import superRed from './../../../../../assets/candies/super-red.png';
import superOrange from './../../../../../assets/candies/super-orange.png';
import superYellow from './../../../../../assets/candies/super-yellow.png';
import superGreen from './../../../../../assets/candies/super-green.png';
import superBlue from './../../../../../assets/candies/super-blue.png';
import superPurple from './../../../../../assets/candies/super-purple.png';
import superCandyMatchSFX from './../../../../../assets/audio/superCandyMatch.mp3';
import { useEffect, useRef, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import LevelManager from '../level-manager';
import { getHorizontalAndVerticalItems } from '../../../../../utils/tile-matching';
import LevelItemFX from '../items-fx/LevelItemFX';

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

type SuperCandyProps = {
	color: CandyColor;
	id: string;
	index: number;
};

const SuperCandy = ({ color, id, index }: SuperCandyProps) => {
	const [scale, setScale] = useState(0);
	const [showFX, setShowFX] = useState(false);
	const firstRender = useFirstRender();
	const indexRef = useRef(index);
	const itemUsedRef = useRef(false);

	useEffect(() => {
		firstRender && setScale(1);
		LevelManager.subscribeItemsChange(onItemsChange);
		return () => {
			LevelManager.unsubscribeItemsChange(onItemsChange);
		};
	}, []);

	useEffect(() => {
		indexRef.current = index;
	}, [index]);

	const onItemsChange = (items: LevelItem[], matched: boolean) => {
		const itemMatched = !items.some(x => x?.key === id);
		if (itemMatched && !itemUsedRef.current) {
			setShowFX(true);
			itemUsedRef.current = true;
			const intersectingItems = getHorizontalAndVerticalItems(indexRef.current);
			superCandyMatchSound.play();
			LevelManager.setItems(
				LevelManager.levelData.items.map((x, i) => (intersectingItems.includes(i) ? null : x)),
				true
			);
		}
	};

	return showFX ? (
		<LevelItemFX color={color} maskSrc="/img/fx/squareShape.png"></LevelItemFX>
	) : (
		<img
			data-candy
			data-color={color}
			src={candyImages[color]}
			className="block w-full h-full m-0 select-none pointer-events-none duration-200"
			style={{
				transform: `scale(${scale})`,
			}}
		></img>
	);
};

export default SuperCandy;
