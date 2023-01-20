import { useState } from 'react';
import useTileInteraction from './hooks/useTileInteraction';

export type TileProps = {
	index: number;
};

const Tile = ({ index }: TileProps) => {
	const [tileElement, setElement] = useState<HTMLDivElement | null>(null);
	useTileInteraction(index, tileElement as HTMLElement);

	return (
		<div
			className="relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded"
			data-index={index}
			data-tile
			ref={setElement}
		>
			<span className="absolute bottom-0 right-0 text-[12px] text-white/50 font-bold">{index}</span>
		</div>
	);
};

export default Tile;
