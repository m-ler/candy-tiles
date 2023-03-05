import { useRecoilState, useRecoilValue } from 'recoil';
import { itemListEditorState } from '../store/itemListEditor';
import { selectedElementState } from '../store/selectedElement';
import { tileListEditorState } from '../store/tileListEditor';
import { slotListEditorState } from '../store/slotListEditor';
import GridEditorLayer from './GridEditorLayer';
import Item from './Item';
import Tile from './Tile';
import Slot from './Slot';

const GridEditor = () => {
	const [slotList, setSlotList] = useRecoilState(slotListEditorState);
	const [tileList, setTileList] = useRecoilState(tileListEditorState);
	const [itemList, setItemList] = useRecoilState(itemListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);

	const updateTileSlotList = (index: number, create: boolean) => {
		setSlotList((list) => {
			const newList = [...list];
			newList[index] = create;
			return newList;
		});

		!create && updateTileList(index, create);
		!create && updateItemList(index, create);
	};

	const updateTileList = (index: number, create: boolean) => {
		setTileList((list) => {
			const newList = [...list];
			newList[index] = create ? selectedElement : null;
			return newList;
		});
	};

	const updateItemList = (index: number, create: boolean) => {
		setItemList((list) => {
			const newList = [...list];
			newList[index] = create ? selectedElement : null;
			return newList;
		});
	};

	const renderSlot = (index: number) => <Slot slotAvaliable={slotList[index]} key={index} index={index}></Slot>;
	const renderTile = (index: number) => <Tile tileObj={tileList[index]} slotAvaliable={!!slotList[index]} key={index} index={index}></Tile>;
	const renderItem = (index: number) => <Item itemObj={itemList[index]} slotAvaliable={slotList[index]} key={index} index={index}></Item>;

	const slotLayerInteractable = selectedElement === null;
	const tileLayerInteractable = selectedElement?.type === 'Tile';
	const itemLayerInteractable = selectedElement?.type === 'Item';

	return (
		<div className="mx-auto aspect-square grow max-w-full relative">
			<GridEditorLayer
				setRenderList={updateTileSlotList}
				renderChild={renderSlot}
				interactable={slotLayerInteractable}
				childAttribute="data-tile-slot"
			></GridEditorLayer>
			<GridEditorLayer
				setRenderList={updateTileList}
				renderChild={renderTile}
				interactable={tileLayerInteractable}
				childAttribute="data-tile"
			></GridEditorLayer>
			<GridEditorLayer
				setRenderList={updateItemList}
				renderChild={renderItem}
				interactable={itemLayerInteractable}
				childAttribute="data-item"
			></GridEditorLayer>
		</div>
	);
};

export default GridEditor;
