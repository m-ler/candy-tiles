import { useState } from 'react';
import { TileProps } from './Tile';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../store/matchList';
import { levelTilesState } from '../../store/levelTiles';
import iceTileSprite from './../../../../../assets/img/tiles/ice.png';
import { levelTasksState } from '../../store/levelTasks';
import useTileInteraction from './hooks/useTileInteraction';
import useAudio from '../../../../../hooks/useAudio';

const IceTile = ({ index }: TileProps) => {
	const [damaged, setDamaged] = useState(false);
	const [tileElement, setTileElement] = useState<HTMLDivElement | null>(null);
	const matchList = useRecoilValue(matchListState);
	const setLevelTasks = useSetRecoilState(levelTasksState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const playAudio = useAudio();

	useTileInteraction(index, tileElement as HTMLElement);

	useEffectAfterMount(() => {
		checkMatchInTile();
	}, [matchList]);

	const checkMatchInTile = () => {
		const matched = !!matchList.some((x) => x.index === index && x.matched);
		if (!matched) return;

		if (!damaged) {
			playAudio({ audioName: 'iceCrack1' });
			setDamaged(true);
			return;
		}

		playAudio({ audioName: 'iceCrack2' });
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
		<div
			className="relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded"
			data-index={index}
			data-tile
			ref={setTileElement}
		>
			<img
				src={iceTileSprite}
				className="pointer-events-none"
				style={{
					opacity: damaged ? 0.6 : 1,
				}}
			></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-white/80 font-bold">{index}</span>
		</div>
	);
};

export default IceTile;
