import Tile from './Tile';
import { useEffect, useRef, useState } from 'react';
import { tilesAreAdjacent } from '../../../../utils/tile-matching';

const elementIsCandy = (element: HTMLElement) => element.hasAttribute('data-candy');

const LevelGrid = () => {
	const [selectedTiles, setSelectedTiles] = useState<HTMLElement[]>([]);
	const dragging = useRef<boolean>(false);

	useEffect(() => {
		console.log(selectedTiles);
	}, [selectedTiles]);

	const handleMouseDown = (e: React.MouseEvent): void => {
		dragging.current = true;
		if (!elementIsCandy(e.target as HTMLElement)) return;
		setSelectedTiles([e.target as HTMLElement]);
	};

	const handleMouseUp = (e: React.MouseEvent): void => {
		dragging.current = false;
		//const selectedSameTile = (e.target as HTMLElement) === selectedTiles[0];
	};

	const handleMouseOut = (e: React.MouseEvent): void => {
		if (!elementIsCandy(e.target as HTMLElement)) return;
	};

	const handleMouseOver = (e: React.MouseEvent): void => {
		if (!elementIsCandy(e.target as HTMLElement) || !selectedTiles[0] || !dragging.current) return;

		const tilesIndexes = [selectedTiles[0], e.target as HTMLElement].map(tileElement =>
			parseInt(tileElement.getAttribute('data-index') ?? '')
		) as [number, number];

		if (!tilesAreAdjacent(...tilesIndexes)) {
			setSelectedTiles([]);
			return;
		}

		console.log('may proceed');

		setSelectedTiles([...selectedTiles, e.target as HTMLElement]);
	};

	return (
		<section
			className="grid bg-purple/50 border border-white grow aspect-square rounded-lg grid-rows-[repeat(9,1fr)] grid-cols-[repeat(9,1fr)] overflow-hidden"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseOut={handleMouseOut}
			onMouseOver={handleMouseOver}
		>
			{Array.from(Array(81).keys()).map((tile, index) => (
				<Tile key={index} selectedTiles={selectedTiles} index={index}></Tile>
			))}
		</section>
	);
};

export default LevelGrid;
