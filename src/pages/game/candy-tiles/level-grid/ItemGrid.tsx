import uuid from 'react-uuid';
import { useLevelContext } from '../../../../context/LevelContext';
import LevelItem from './LevelItem';

type ItemGridProps = {
	tiles: LevelTile[];
};

const ItemGrid = ({ tiles }: ItemGridProps) => {
	const levelContext = useLevelContext();

	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
			{levelContext?.levelItems.map((item, index) => {
				return tiles[index] === null ? (
					<div key={index}></div>
				) : (
					<LevelItem key={(item as LevelItem)?.key || uuid()} item={item} initialIndex={index} id={item?.key || ''}></LevelItem>
				);
			})}
		</div>
	);
};

export default ItemGrid;
