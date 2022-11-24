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
	id: string;
};

const Candy = ({ color, index, id }: CandyProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);

	const initialIndex = LevelManager.levelData.items.findIndex(x => x?.key === id);
	const initailColumnIndex = initialIndex + 1 - (Math.ceil((initialIndex + 1) / 9) - 1) * 9;

	useEffect(() => {
		updatePosition();
		LevelManager.subscribeItemsChange(onLevelItemsChanged);

		return () => {
			LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
		};
	}, []);

	const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
		const candyMatched = !items.some(x => x?.key === id);
		candyMatched && updateOpacity('0');
		!candyMatched && updatePosition();
	};

	const enableTransition = (enable: boolean): void => {
		if (elementRef.current) elementRef.current.style.transitionProperty = enable ? 'opacity,top,left' : 'opacity';
	};

	const updatePosition = () => {
		const currentIndex = LevelManager.levelData.items.findIndex(x => x?.key === id);
		const rowIndex = Math.ceil((currentIndex + 1) / 9);
		const columnIndex = currentIndex + 1 - (rowIndex - 1) * 9;

		if (elementRef.current) {
			elementRef.current.style.top = `${(rowIndex - 1) * 11.125}%`;
			elementRef.current.style.left = `${(columnIndex - 1) * 11.125}%`;
		}
	};

	const updateOpacity = (value: string) => {
		if (elementRef.current) elementRef.current.style.opacity = value;
	};

	return (
		<div
			className={`w-[calc(100%/9)] p-[1.7%] aspect-square block absolute left-[${
				(initailColumnIndex - 1) * 11.125
			}%] top-[-100%] duration-300`}
			style={{ transitionProperty: 'opacity,top,left' }}
			data-candy
			ref={elementRef}
			data-index={index}
			data-color={color}
		>
			<img src={candyImages[color]} className="block rounded-full w-full h-full m-0 select-none pointer-events-none"></img>
		</div>
	);
};

export default Candy;
