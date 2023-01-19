import { useState } from 'react';
import { checkForAdjacentMatch } from '../../../../../game-algorithms/tile-matching';
import { TileProps } from './Tile';
import rockCrack1SFX from './../../../../../assets/audio/rockCrack1.mp3';
import rockCrack2SFX from './../../../../../assets/audio/rockCrack2.mp3';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../atoms/matchList';
import useEffectAfterFirstRender from '../../../../../hooks/useEffectAfterFirstRender';
import { levelTilesState } from '../../atoms/levelTiles';
import rockTileSprite from './../../../../../assets/img/tiles/rock.png';
import { levelTasksState } from '../../atoms/levelTasks';

const rockCrack1Sound = new Audio(rockCrack1SFX);
const rockCrack2Sound = new Audio(rockCrack2SFX);

const RockTile = ({ index }: TileProps) => {
	const [damaged, setDamaged] = useState(false);
	const matchList = useRecoilValue(matchListState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const setLevelTasks = useSetRecoilState(levelTasksState);

	useEffectAfterFirstRender(() => {
		checkMatchInAdjacentTiles();
	}, [matchList]);

	const checkMatchInAdjacentTiles = () => {
		const matched = checkForAdjacentMatch(index, matchList);
		if (!matched) return;

		if (!damaged) {
			rockCrack1Sound.play();
			setDamaged(true);
			return;
		}

		rockCrack2Sound.play();

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
