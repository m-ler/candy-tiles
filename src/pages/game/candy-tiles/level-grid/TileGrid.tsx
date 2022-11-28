import { useEffect, useRef, useState } from 'react';
import { useLevelContext } from '../../../../context/LevelContext';
import { tilesAreAdjacent } from '../../../../utils/tile-matching';
import tileClickSFX from './../../../../assets/audio/tileClick.mp3';
import LevelManager from './level-manager';
import Tile from './Tile';

const elementIsTile = (element: HTMLElement) => element.hasAttribute('data-tile');

type TileGridProps = {
	tiles: LevelTile[];
};

const TileGrid = ({ tiles }: TileGridProps) => {
	const [selectedTiles, setSelectedTiles] = useState<HTMLElement[]>([]);
	const dragging = useRef<boolean>(false);
	const levelContext = useLevelContext();
	const firstTile = useRef<HTMLElement | null>();
	const tileClickAudio = useRef<HTMLAudioElement>(new Audio(tileClickSFX));

	useEffect(() => {
		tileClickAudio.current.volume = 0.5;
	}, []);

	const handleMouseDown = (e: React.MouseEvent): void => {
		if (!elementIsTile(e.target as HTMLElement)) return;
		dragging.current = true;
		firstTile.current = e.target as HTMLElement;
		tileClickAudio.current.play();
	};

	const handleMouseUp = (e: React.MouseEvent): void => {
		firstTile.current = null;
		dragging.current = false;
	};

	const handleMouseOver = (e: React.MouseEvent): void => {
		if (!elementIsTile(e.target as HTMLElement) || !firstTile.current || !dragging.current) return;

		const firstTileIndex = parseInt(firstTile.current.getAttribute('data-index') || '');
		const secondTileIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '');

		if (!tilesAreAdjacent(firstTileIndex, secondTileIndex)) {
			levelContext?.updateSelectedTiles([null, null]);
			return;
		}

		LevelManager.swapItems([firstTileIndex, secondTileIndex]);

		firstTile.current = null;
	};

	return (
		<div
			className="grid grid-rows-[repeat(9,1fr)] grid-cols-[repeat(9,1fr)] absolute top-0 left-0 w-full h-full"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseOver={handleMouseOver}
		>
			{tiles.map((tile, index) =>
				tile === null ? <div key={index}> </div> : <Tile key={index} selectedTiles={selectedTiles} index={index}></Tile>
			)}
		</div>
	);
};

export default TileGrid;
