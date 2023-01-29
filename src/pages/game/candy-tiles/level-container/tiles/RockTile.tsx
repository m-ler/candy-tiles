import { useState } from 'react';
import { checkForAdjacentMatch } from '../../../../../game-algorithms/tile-matching';
import { TileProps } from './Tile';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../atoms/matchList';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { levelTilesState } from '../../atoms/levelTiles';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import { levelTasksState } from '../../atoms/levelTasks';
import useAudio from '../../../../../hooks/useAudio';

const RockTile = ({ index }: TileProps) => {
	const [damaged, setDamaged] = useState(false);
	const matchList = useRecoilValue(matchListState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const setLevelTasks = useSetRecoilState(levelTasksState);
	const playAudio = useAudio();

	useEffectAfterMount(() => {
		checkMatchInAdjacentTiles();
	}, [matchList]);

	const checkMatchInAdjacentTiles = () => {
		const matched = checkForAdjacentMatch(index, matchList) || matchList.some((x) => x.index === index && x.matched);
		if (!matched) return;

		if (!damaged) {
			playAudio({ audioName: 'rockCrack1' });
			setDamaged(true);
			return;
		}

		playAudio({ audioName: 'rockCrack2' });

		setLevelTiles((tiles) => {
			const newTiles = structuredClone(tiles);
			newTiles[index] = { type: 'Normal' };
			return newTiles;
		});
		setLevelTasks((tasks) => ({
			...tasks,
			rockTiles: tasks.rockTiles + 1,
		}));
	};

	return (
		<div className="relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded cursor-not-allowed" data-index={index}>
			<img
				src={rockTileSprite}
				className="pointer-events-none"
				style={{
					opacity: damaged ? 0.6 : 1,
				}}
			></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-black/80 font-bold">{index}</span>
		</div>
	);
};

export default RockTile;
