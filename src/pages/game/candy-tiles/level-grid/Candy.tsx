import red from './../../../../assets/candies/red.png';
import orange from './../../../../assets/candies/orange.png';
import yellow from './../../../../assets/candies/yellow.png';
import green from './../../../../assets/candies/green.png';
import blue from './../../../../assets/candies/blue.png';
import purple from './../../../../assets/candies/purple.png';
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLevelContext } from '../../../../context/LevelContext';
import { checkForMatchings, getTileTargetPosition, NewItemPosition } from '../../../../utils/tile-matching';
import uuid from 'react-uuid';
import LevelManager from './level-manager';

export const CandyColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

const candyImages: { [key: string]: string } = {
	'Red': red,
	'Orange': orange,
	'Yellow': yellow,
	'Green': green,
	'Blue': blue,
	'Purple': purple,
};

type CandyProps = {
	color: CandyColor;
	index: number;
};

const Candy = ({ color, index }: CandyProps) => {
	const levelContext = useLevelContext();
	const [key, setKey] = useState(uuid());
	const elementRef = useRef<HTMLDivElement | null>(null);
	const swappedIndex = useRef<number | null>(null);
	const firstRender = useRef<boolean>(true);

	useEffect(() => {
		if (!firstRender.current) return;
		firstRender.current = false;

		LevelManager.subscribeItemsChange(onLevelItemsChanged);
		LevelManager.subscribeItemsReposition(onItemsReposition);
		LevelManager.subscribeItemsRerender(onItemsRerender);

		return () => {
			LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
			LevelManager.unsubscribeItemsReposition(onItemsReposition);
			LevelManager.unsubscribeItemsRerender(onItemsRerender);
		};
	}, []);

	useEffect(() => {
		const tileSelected = levelContext?.selectedTiles.includes(index);
		if (!tileSelected || LevelManager.levelData.actionsLocked) return;

		swappedIndex.current = levelContext?.selectedTiles.find(x => x !== index) || 0;
		const targetPosition = getTileTargetPosition(index, swappedIndex.current);

		updatePosition(targetPosition);

		const firstSelectedTile = levelContext?.selectedTiles[0] === index;
		if (!firstSelectedTile) return;

		setTimeout(swapSelectedTilesPositions, 200);
	}, [levelContext?.selectedTiles]);

	const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
		const candyMatched = items[swappedIndex.current || index] === null;
		candyMatched && updateOpacity('0');
		!candyMatched && !matched && updatePosition([0, 0]);
	};

	const onItemsReposition = (newPositions: NewItemPosition[]): void => {
		const newPosition = newPositions.find(x => x.index === (!!swappedIndex.current ? swappedIndex.current : index));
		if (!!newPosition) updatePosition([newPosition.tilesToMove * 100, null]);
	};

	const onItemsRerender = (items: LevelItem[]) => {
		setKey(uuid());
	};

	const swapSelectedTilesPositions = (): void => {
		if (levelContext === null) return;
		const newItems = [...levelContext.currentLevelItems];
		newItems[index] = levelContext.currentLevelItems[swappedIndex.current || 0];
		newItems[swappedIndex.current || 0] = levelContext.currentLevelItems[index];

		LevelManager.setItems(newItems, false);
		LevelManager.checkMatchings();
	};

	const enableTransition = (enable: boolean): void => {
		if (elementRef.current) elementRef.current.style.transitionProperty = enable ? 'opacity,top,left' : 'opacity';
	};

	const updatePosition = (position: [number | null, number | null]) => {
		if (elementRef.current) {
			position[0] !== null && (elementRef.current.style.top = `${position[0]}%`);
			position[1] !== null && (elementRef.current.style.left = `${position[1]}%`);
		}
	};

	const updateOpacity = (value: string) => {
		if (elementRef.current) elementRef.current.style.opacity = value;
	};

	return (
		<div
			className={`w-full aspect-square block p-[15%] relative left-0 top-0 duration-200`}
			style={{ transitionProperty: 'opacity,top,left' }}
			data-candy
			ref={elementRef}
			data-index={index}
			data-color={color}
			key={key}
		>
			<img src={candyImages[color]} className="block rounded-full w-full h-full m-0 select-none pointer-events-none"></img>
		</div>
	);
};

export default Candy;
