import { TILE_COUNT } from '../../../../../config';
import useSelectedLevel from '../../../../../hooks/useSelectedLevel';
import LevelItem from '../level-items/LevelItem';
import { useMemo } from 'react';

export let liveItemsIds: string[] = [];
export const removeLiveItem = (id: string): void => {
	liveItemsIds = liveItemsIds.filter((x) => x !== id);
};

const ItemGrid = () => {
	const selectedLevel = useSelectedLevel();
	const tilesLayout = useMemo(() => selectedLevel.data?.file.initialTiles || [], [selectedLevel.data]);

	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none duration-1000" data-cy="level-items-grid">
			{Array(TILE_COUNT)
				.fill('')
				.map((x, index) => {
					return tilesLayout[index] === null ? <div key={index}></div> : <LevelItem key={index} initialIndex={index}></LevelItem>;
				})}
		</div>
	);
};

export default ItemGrid;
