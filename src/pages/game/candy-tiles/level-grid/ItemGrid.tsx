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
				const id = uuid();
				return tiles[index] === null ? (
					<div key={index}></div>
				) : (item as Candy)?.type === 'Candy' ? (
					<LevelItem key={(item as Candy).key} item={item} index={index} id={item?.key || ''}></LevelItem>
				) : (
					<div key={id}></div>
				);
			})}
		</div>
	);
};

export default ItemGrid;
