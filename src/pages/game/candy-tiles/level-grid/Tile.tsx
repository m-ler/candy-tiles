import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { getTileTargetPosition } from '../../../../utils/tile-matching';
import Candy, { CandyColors } from './Candy';

type TileProps = {
	selectedTiles: HTMLElement[];
	index: number;
};

const Tile = ({ selectedTiles, index }: TileProps) => {
	const randomCandyColor = useMemo(() => CandyColors[Math.floor(Math.random() * CandyColors.length)], []);

	const [selected, setSelected] = useState<boolean>(false);
	const [candyColor, setCandyColor] = useState<string>(randomCandyColor);
	const tileElementRef = useRef<HTMLDivElement | null>(null);
	const itemElementRef = useRef<HTMLDivElement | null>(null);

	const moveToTargetTile = () => {
		const targetTileIndex = selectedTiles.find(x => x !== itemElementRef?.current)?.getAttribute('data-index');
		const targetPosition = getTileTargetPosition(index, parseInt(targetTileIndex || ''));
		if (itemElementRef.current) {
			itemElementRef.current.style.top = `${targetPosition[0]}%` || '0%';
			itemElementRef.current.style.left = `${targetPosition[1]}%` || '0%';
		}
	};

	useEffect(() => {
		if (!!tileElementRef?.current && selectedTiles.includes(itemElementRef?.current as HTMLElement) && selectedTiles.length === 2) {
			moveToTargetTile();
			//setCandyColor(otherCandy?.getAttribute('data-color') || '');
		}
	}, [selectedTiles]);

	return (
		<div
			className="relative border border-purple hover:bg-light-yellow/50 duration-200 select-none"
			ref={tileElementRef}
			data-index={index}
			data-color={candyColor}
		>
			<Candy color={candyColor} ref={itemElementRef} index={index}></Candy>
		</div>
	);
};

export default Tile;
