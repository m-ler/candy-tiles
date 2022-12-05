import superRed from './../../../../../assets/candies/super-red.png';
import superOrange from './../../../../../assets/candies/super-orange.png';
import superYellow from './../../../../../assets/candies/super-yellow.png';
import superGreen from './../../../../../assets/candies/super-green.png';
import superBlue from './../../../../../assets/candies/super-blue.png';
import superPurple from './../../../../../assets/candies/super-purple.png';
import { useEffect, useRef, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import LevelManager from '../level-manager';
import { getHorizontalAndVerticalItems } from '../../../../../utils/tile-matching';

const candyImages: { [key: string]: string } = {
	'Red': superRed,
	'Orange': superOrange,
	'Yellow': superYellow,
	'Green': superGreen,
	'Blue': superBlue,
	'Purple': superPurple,
};

export const CandyColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

type SuperCandyProps = {
	color: CandyColor;
	id: string;
	index: number;
};

const SuperCandy = ({ color, id, index }: SuperCandyProps) => {
	const [scale, setScale] = useState(0);
	const firstRender = useFirstRender();
	const indexRef = useRef(index);

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
		//console.log(`super changed: ${color}`);

		itemMatched && console.log(`super matched: ${color}`);
		if (itemMatched) {
			console.log(indexRef.current);

			const intersectingItems = getHorizontalAndVerticalItems(indexRef.current);
			LevelManager.setItems(
				LevelManager.levelData.items.map((x, i) => (intersectingItems.includes(i) ? null : x)),
				false
			);
		}
	};

	return (
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
