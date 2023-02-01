import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import Item from './Item';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedElementState } from '../atoms/selectedElement';
import { tileSlotListEditorState } from '../atoms/tileSlotListEditor';
import { itemListEditorState } from '../atoms/itemListEditor';

const elementIsItem = (element: HTMLElement) => element.hasAttribute('data-item');

const ItemsLayer = () => {
	const tileSlotList = useRecoilValue(tileSlotListEditorState);
	const [itemList, setItemList] = useRecoilState(itemListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);

	const handleMouse = (event: React.MouseEvent) => {
		if (event.buttons !== 1 && event.buttons !== 2) return;
		if (!elementIsItem(event.target as HTMLElement)) return;
		setItems(parseInt((event.target as HTMLElement).getAttribute('data-index') || ''), event.buttons === 1);
	};

	const setItems = (index: number, create: boolean) => {
		setItemList((list) => {
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
			className="grid top-0 left-0 w-full h-full absolute top-0 left-0 pointer-events-none"
			style={{
				gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
				gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
				pointerEvents: selectedElement?.type === 'Item' ? 'all' : 'none',
			}}
		>
			{Array(GRID_NUMBER)
				.fill(null)
				.map((x, i) => (
					<Item itemObj={itemList[i]} slotAvaliable={tileSlotList[i]} key={i} index={i}></Item>
				))}
		</div>
	);
};

export default ItemsLayer;
