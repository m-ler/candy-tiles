import uuid from 'react-uuid';
import { useLevelContext } from '../../../../context/LevelContext';
import Candy from './Candy';

type ItemGridProps = {
	tiles: LevelTile[];
};

const ItemGrid = ({ tiles }: ItemGridProps) => {
	const levelContext = useLevelContext();

	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
			{levelContext?.currentLevelItems.map((item, index) => {
				const id = uuid();
				return tiles[index] === null ? (
					<div key={index}></div>
				) : (item as Candy)?.type === 'Candy' ? (
					<Candy key={(item as Candy).key} color={(item as Candy).color} index={index} id={item?.key || ''}></Candy>
				) : (
					<div key={id}></div>
				);
			})}
		</div>
	);
};

export default ItemGrid;
