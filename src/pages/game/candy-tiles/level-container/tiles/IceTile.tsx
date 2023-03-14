import { TileProps } from './Tile';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import DestructibleTile from './DestructibleTile';
import { useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from './../../store/matchList';
import { levelTasksState } from './../../store/levelTasks';
import useTileInteraction from './hooks/useTileInteraction';
import { LevelTasks } from '../../types';

const IceTile = ({ index }: TileProps) => {
	const matchList = useRecoilValue(matchListState);
	const setLevelTasks = useSetRecoilState<LevelTasks>(levelTasksState);
	const matched = useMemo(() => !!matchList.some((x) => x.index === index && x.matched), [matchList]);

	const [tileElement, setTileElement] = useState<HTMLDivElement | null>(null);
	useTileInteraction(index, tileElement as HTMLElement);

	const onDestructed = () => {
		setLevelTasks((tasks) => ({
			...tasks,
			iceTiles: tasks.iceTiles + 1,
		}));
	};

	return (
		<DestructibleTile
			ref={setTileElement}
			data-tile
			tileType="IceTile"
			index={index}
			spriteSrc={iceTileSprite}
			crackSoundName="iceCrack1"
			damagedCrackSoundName="iceCrack2"
			matched={matched}
			onDestructed={onDestructed}
		></DestructibleTile>
	);
};

export default IceTile;
