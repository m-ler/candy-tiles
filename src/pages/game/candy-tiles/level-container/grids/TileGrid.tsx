import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { COLUMN_NUMBER, ROW_NUMBER } from '../../../../../config';
import { tilesAreAdjacent } from '../../../../../game-algorithms/tile-matching';
import { finishedMovingState } from '../../atoms/finishedMoving';
import { levelMovesState } from '../../atoms/levelMoves';
import { levelTilesState } from '../../atoms/levelTiles';
import { swappedItemsState } from '../../atoms/swappedItems';
import IceTile from '../tiles/IceTile';
import RockTile from '../tiles/RockTile';
import Tile from '../tiles/Tile';
import useAudio from '../../../../../hooks/useAudio';

const elementIsTile = (element: HTMLElement) => element.hasAttribute('data-tile');

const getTileComponent = (tileType: string, index: number): JSX.Element => {
	switch (tileType) {
		case 'Normal':
			return <Tile key={index} index={index}></Tile>;

		case 'Ice':
			return <IceTile key={index} index={index}></IceTile>;

		case 'Rock':
			return <RockTile key={index} index={index}></RockTile>;

		default:
			return <Tile key={index} index={index}></Tile>;
	}
};

const TileGrid = () => {
	const levelTiles = useRecoilValue(levelTilesState);
	const dragging = useRef<boolean>(false);
	const firstTile = useRef<HTMLElement | null>();
	const setSwappedItems = useSetRecoilState(swappedItemsState);
	const finishedMoving = useRecoilValue(finishedMovingState);
	const tileGridElementRef = useRef<HTMLDivElement | null>(null);
	const levelMoves = useRecoilValue(levelMovesState);
	const playAudio = useAudio();

	useEffect(() => {
		updateGridInteraction();
	}, [finishedMoving]);

	const updateGridInteraction = () => {
		if (tileGridElementRef.current) {
			const gameOver = finishedMoving && !levelMoves.spendAllMoves;
			tileGridElementRef.current.style.pointerEvents = gameOver ? 'all' : 'none';
		}
	};

	const handleMouseDown = (e: React.MouseEvent): void => {
		if (!elementIsTile(e.target as HTMLElement)) return;
		dragging.current = true;
		firstTile.current = e.target as HTMLElement;
		playAudio({ audioName: 'tileClick' });
	};

	const handleMouseUp = (): void => {
		firstTile.current = null;
		dragging.current = false;
	};

	const handleMouseOver = (e: React.MouseEvent): void => {
		if (!elementIsTile(e.target as HTMLElement) || !firstTile.current || !dragging.current || !finishedMoving) return;

		const firstTileIndex = parseInt(firstTile.current.getAttribute('data-index') || '');
		const secondTileIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '');

		if (!tilesAreAdjacent(firstTileIndex, secondTileIndex)) {
			setSwappedItems([null, null]);
			return;
		}

		setSwappedItems([firstTileIndex, secondTileIndex]);
		firstTile.current = null;
	};

	return (
		<div
			className="grid absolute top-0 left-0 w-full h-full"
			style={{
				gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
				gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseOver={handleMouseOver}
			ref={tileGridElementRef}
		>
			{levelTiles.map((tile, index) => (tile === null ? <div key={index}> </div> : getTileComponent(tile.type, index)))}
		</div>
	);
};

export default TileGrid;
