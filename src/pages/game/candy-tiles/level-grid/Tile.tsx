import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import Candy, { CandyColors } from './Candy';

type TileProps = {
	selectedTiles: HTMLElement[];
	index: number;
};

const Tile = ({ selectedTiles, index }: TileProps) => {
	const [selected, setSelected] = useState<boolean>(false);
	const tileElementRef = useRef<HTMLDivElement | null>(null);
	const candyElementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!!tileElementRef?.current && selectedTiles.includes(candyElementRef?.current as HTMLElement)) {
			//console.log(candyElementRef.current);
		}
	}, [selectedTiles]);

	const color = useMemo(() => CandyColors[Math.floor(Math.random() * CandyColors.length)], []);
	return (
		<div
			className="relative border border-purple hover:bg-light-yellow/50 duration-200 select-none"
			ref={tileElementRef}
			data-index={index}
		>
			<Candy color={color} ref={candyElementRef} index={index}></Candy>
		</div>
	);
};

export default Tile;
