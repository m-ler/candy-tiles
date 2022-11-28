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

	return (
		<div
			className="relative bg-black/25 m-[2%] hover:bg-light-yellow/50 duration-200 select-none rounded"
			ref={tileElementRef}
			data-index={index}
			data-tile
		>
			<span className="absolute bottom-0 right-0 text-[12px] text-white font-bold hidden">{index}</span>
		</div>
	);
};

export default Tile;
