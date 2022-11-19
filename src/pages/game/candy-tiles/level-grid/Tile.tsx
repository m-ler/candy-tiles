import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { getTileTargetPosition } from '../../../../utils/tile-matching';
import Candy, { CandyColors } from './Candy';

type TileProps = {
	selectedTiles: HTMLElement[];
	index: number;
};

const Tile = ({ selectedTiles, index }: TileProps) => {
	const [selected, setSelected] = useState<boolean>(false);
	const tileElementRef = useRef<HTMLDivElement | null>(null);
	const itemElementRef = useRef<HTMLDivElement | null>(null);

/* 	const moveToTargetTile = () => {
		const targetTileIndex = selectedTiles.find(x => x !== itemElementRef?.current)?.getAttribute('data-index');
		const targetPosition = getTileTargetPosition(index, parseInt(targetTileIndex || ''));
		if (itemElementRef.current) {
			itemElementRef.current.style.top = `${targetPosition[0]}%` || '0%';
			itemElementRef.current.style.left = `${targetPosition[1]}%` || '0%';
		}
	}; */

	return (
		<div
			className="relative bg-[#0983ed]/50 border border-pink hover:bg-light-yellow/50 duration-200 select-none"
			ref={tileElementRef}
			data-index={index}
			data-tile
		></div>
	);
};

export default Tile;
