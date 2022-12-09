import chocolateSprite from './../../../../../assets/candies/chocolate.png';
import { useEffect, useRef, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import LevelManager from '../level-manager';
import chocolateMatchSFX from './../../../../../assets/audio/chocolateMatch.mp3';

type ChocolateProps = {
	id: string;
	initialIndex: number;
};

const chocolateMatchSound = new Audio(chocolateMatchSFX);
chocolateMatchSound.volume = 0.5;

const matchAllCandiesOfColor = (chocolateIndex: number, otherCandyIndex?: number): void => {
	const newItems = structuredClone(LevelManager.levelData.items);
	newItems[chocolateIndex] = null;
	if (typeof otherCandyIndex === 'number') newItems[otherCandyIndex] = null;
	for (let i = 0; i < newItems.length; i++) {
		const candyColor = (newItems[i] as Candy)?.color;
		if (candyColor === LevelManager.levelData.latestSwappedCandyColor) newItems[i] = null;
	}

	chocolateMatchSound.play();
	LevelManager.setItems(newItems, true);
};

const Chocolate = ({ id, initialIndex }: ChocolateProps) => {
	const [scale, setScale] = useState(0);
	const firstRender = useFirstRender();
	const indexRef = useRef(initialIndex);
	const itemUsedRef = useRef(false);

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

		if (itemMatched && !itemUsedRef.current) {
			itemUsedRef.current = true;
			matchAllCandiesOfColor(indexRef.current);
		}
	};

	const onItemsSwap = (swappedItems: [number | null, number | null]) => {
		const thisItemSwapped = swappedItems.includes(indexRef.current);
		if (!thisItemSwapped) return;

		const candyTypes = ['Candy', 'SuperCandy'];
		const otherItemIndex = swappedItems.find(x => x !== indexRef.current) ?? 0;
		const otherItemIsCandy = candyTypes.includes((LevelManager.levelData.items[otherItemIndex] as LevelItem)?.type ?? '');

		if (!otherItemIsCandy) return;

		matchAllCandiesOfColor(indexRef.current, otherItemIndex);
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
