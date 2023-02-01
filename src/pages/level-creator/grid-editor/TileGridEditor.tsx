import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import ItemsLayer from './ItemsLayer';
import TileElement from './TileElement';
import TilesLayer from './TilesLayer';
import TileSlot from './TileSlot';
import TileSlotsLayer from './TileSlotsLayer';

const TileGridEditor = () => {
	return (
		<>
			<TileSlotsLayer></TileSlotsLayer>
			<TilesLayer></TilesLayer>
			<ItemsLayer></ItemsLayer> 
		</>
	);
};

export default TileGridEditor;
