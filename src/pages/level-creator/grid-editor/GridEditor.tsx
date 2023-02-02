import { useRecoilState, useRecoilValue } from 'recoil';
import { itemListEditorState } from '../atoms/itemListEditor';
import { selectedElementState } from '../atoms/selectedElement';
import { tileListEditorState } from '../atoms/tileListEditor';
import { tileSlotListEditorState } from '../atoms/tileSlotListEditor';
import GridEditorLayer from './GridEditorLayer';
import Item from './Item';
import Tile from './Tile';
import TileSlot from './TileSlot';

const GridEditor = () => {
	const [slotList, setSlotList] = useRecoilState(tileSlotListEditorState);
	const [tileList, setTileList] = useRecoilState(tileListEditorState);
	const [itemList, setItemList] = useRecoilState(itemListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);

	const updateTileSlotList = (index: number, create: boolean) => {
		setSlotList((list) => {
			const newList = [...list];
			newList[index] = create;
			return newList;
		});

		if (!create) {
			/* setTileList((list) => {
				const newList = [...list];
				newList[index] = null;
				return newList;
			}); */
		}
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

	const renderSlot = (index: number) => <TileSlot slotAvaliable={slotList[index]} key={index} index={index}></TileSlot>;
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
