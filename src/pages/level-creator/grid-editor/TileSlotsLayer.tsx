import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import TileSlot from './TileSlot';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedElementState } from '../atoms/selectedElement';
import React from 'react';
import { tileSlotListEditorState } from '../atoms/tileSlotListEditor';
import { tileListEditorState } from '../atoms/tileListEditor';

const elementIsTileSlot = (element: HTMLElement) => element.hasAttribute('data-tile-slot');

const TileSlotsLayer = () => {
	const [tileSlotList, setTileSlotList] = useRecoilState(tileSlotListEditorState);
	const setTileList = useSetRecoilState(tileListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);

	const handleMouse = (event: React.MouseEvent) => {
		if (event.buttons !== 1 && event.buttons !== 2) return;
		if (!elementIsTileSlot(event.target as HTMLElement)) return;
		setTileItems(parseInt((event.target as HTMLElement).getAttribute('data-index') || ''), event.buttons === 1);
	};

	const setTileItems = (index: number, activate: boolean) => {
		setTileSlotList((list) => {
			const newList = [...list];
			newList[index] = activate;
			return newList;
		});

		if (!activate) {
			setTileList((list) => {
				const newList = [...list];
				newList[index] = null;
				return newList;
			});
		}
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
				pointerEvents: selectedElement === null ? 'all' : 'none',
			}}
		>
			{Array(GRID_NUMBER)
				.fill(null)
				.map((x, i) => (
					<TileSlot slotAvaliable={tileSlotList[i]} key={i} index={i}></TileSlot>
				))}
		</div>
	);
};

export default TileSlotsLayer;
