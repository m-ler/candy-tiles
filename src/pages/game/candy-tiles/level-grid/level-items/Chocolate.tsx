import chocolateSprite from './../../../../../assets/candies/chocolate.png';
import { useEffect, useRef, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import LevelManager from '../level-manager';
import { getHorizontalAndVerticalItems } from '../../../../../utils/tile-matching';

type ChocolateProps = {
	id: string;
	index: number;
};

const Chocolate = ({ id, index }: ChocolateProps) => {
	const [scale, setScale] = useState(0);
	const firstRender = useFirstRender();
	const indexRef = useRef(index);
	const isActiveRef = useRef(false);

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

		/* if (itemMatched && !isActiveRef.current) {
			isActiveRef.current = true;
			const intersectingItems = getHorizontalAndVerticalItems(indexRef.current);
			LevelManager.setItems(
				LevelManager.levelData.items.map((x, i) => (intersectingItems.includes(i) ? null : x)),
				true
			);
		} */
	};

	return (
		<img
			data-chocolate
			src={chocolateSprite}
			className="block w-full h-full m-0 select-none pointer-events-none duration-200 animate-[scaleOscillate_0.3s_infinite_alternate]"
			style={{
				transform: `scale(${scale})`,
			}}
		></img>
	);
};

export default Chocolate;
