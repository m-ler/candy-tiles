import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedElementState } from '../atoms/selectedElement';
import { tileListEditorState } from '../atoms/tileListEditor';
import React from 'react';
import Tile from './Tile';
import { tileSlotListEditorState } from '../atoms/tileSlotListEditor';

const elementIsTile = (element: HTMLElement) => element.hasAttribute('data-tile');

const TilesLayer = () => {
	const tileSlotList = useRecoilValue(tileSlotListEditorState);
	const [tileList, setTileList] = useRecoilState(tileListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);

	const handleMouse = (event: React.MouseEvent) => {
		if (event.buttons !== 1 && event.buttons !== 2) return;
		if (!elementIsTile(event.target as HTMLElement)) return;
		setTileItems(parseInt((event.target as HTMLElement).getAttribute('data-index') || ''), event.buttons === 1);
	};

	const setTileItems = (index: number, create: boolean) => {
		setTileList((list) => {
			const newList = [...list];
			newList[index] = create ? selectedElement : null;
			return newList;
		});
	};

	return (
		<div
			onMouseDown={handleMouse}
			onMouseOver={handleMouse}
			onContextMenu={(e) => e.preventDefault()}
			className="grid top-0 left-0 w-full h-full absolute top-0 left-0"
			style={{
				gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
				gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
				pointerEvents: selectedElement?.type === 'Tile' ? 'all' : 'none',
			}}
		>
			{Array(GRID_NUMBER)
				.fill(null)
				.map((x, i) => (
					<Tile tileObj={tileList[i]} slotAvaliable={!!tileSlotList[i]} key={i} index={i}></Tile>
				))}
		</div>
	);
};

export default TilesLayer;
