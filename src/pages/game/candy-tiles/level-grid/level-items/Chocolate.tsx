import chocolateSprite from './../../../../../assets/candies/chocolate.png';
import { useEffect, useRef, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import LevelManager from '../level-manager';
import { getHorizontalAndVerticalItems } from '../../../../../utils/tile-matching';

type ChocolateProps = {
	id: string;
	initialIndex: number;
};

const Chocolate = ({ id, initialIndex }: ChocolateProps) => {
	const [scale, setScale] = useState(0);
	const firstRender = useFirstRender();
	const indexRef = useRef(initialIndex);
	const isActiveRef = useRef(false);

	useEffect(() => {
		firstRender && setScale(1);
		LevelManager.subscribeItemsChange(onItemsChange);
		LevelManager.subscribeItemsSwap(onItemsSwap);
		return () => {
			LevelManager.unsubscribeItemsChange(onItemsChange);
			LevelManager.unsubscribeItemsSwap(onItemsSwap);
		};
	}, []);

	useEffect(() => {
		indexRef.current = initialIndex;
	}, [initialIndex]);

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

	const onItemsSwap = (swappedItems: [number | null, number | null]) => {
		const thisItemSwapped = swappedItems.includes(indexRef.current);
		if (!thisItemSwapped) return;

		const candyTypes = ['Candy', 'Supercandy'];
		const otherItemIndex = swappedItems.find(x => x !== indexRef.current) ?? 0;
		const otherItemIsCandy = candyTypes.includes((LevelManager.levelData.items[otherItemIndex] as LevelItem)?.type ?? '');

		if (!otherItemIsCandy) return;

		const otherCandyColor = (LevelManager.levelData.items[otherItemIndex] as Candy).color;
		console.log(indexRef.current);

		const newItems = structuredClone(LevelManager.levelData.items);
		newItems[indexRef.current] = null;
		newItems[otherItemIndex] = null;
		for (let i = 0; i < newItems.length; i++) {
			const candyColor = (newItems[i] as Candy)?.color;
			candyColor === otherCandyColor && console.log(candyColor);

			if (candyColor === otherCandyColor) newItems[i] = null;
		}

		LevelManager.setItems(newItems, true);
		LevelManager.refreshGrid();
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
