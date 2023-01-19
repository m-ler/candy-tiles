import { useState } from 'react';
import { TileProps } from './Tile';
import iceCrack1SFX from './../../../../../assets/audio/iceCrack1.mp3';
import iceCrack2SFX from './../../../../../assets/audio/iceCrack2.mp3';
import useEffectAfterFirstRender from '../../../../../hooks/useEffectAfterFirstRender';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../atoms/matchList';
import { levelTilesState } from '../../atoms/levelTiles';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import { levelTasksState } from '../../atoms/levelTasks';

const iceCrack1Sound = new Audio(iceCrack1SFX);
const iceCrack2Sound = new Audio(iceCrack2SFX);

const IceTile = ({ index }: TileProps) => {
	const [damaged, setDamaged] = useState(false);
	const matchList = useRecoilValue(matchListState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const setLevelTasks = useSetRecoilState(levelTasksState);

	useEffectAfterFirstRender(() => {
		checkMatchInTile();
	}, [matchList]);

	const checkMatchInTile = () => {
		const matched = !!matchList.find((x) => x.index === index)?.matched;
		if (!matched) return;

		if (!damaged) {
			iceCrack1Sound.play();
			setDamaged(true);
			return;
		}

		iceCrack2Sound.play();
		setLevelTiles((tiles) => {
			const newTiles = structuredClone(tiles);
			newTiles[index] = { type: 'Normal' };
			return newTiles;
		});
		setLevelTasks((tasks) => ({
			...tasks,
			iceTiles: tasks.iceTiles + 1,
		}));
	};

	return (
		<div className="relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded" data-index={index} data-tile>
			<img
				src={iceTileSprite}
				className="pointer-events-none"
				style={{
					opacity: damaged ? 0.6 : 1,
				}}
			></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-black font-bold">{index}</span>
		</div>
	);
};

export default IceTile;
