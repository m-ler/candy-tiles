import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../store/matchList';
import { levelTilesState } from '../../store/levelTiles';
import useAudio from '../../../../../hooks/useAudio';
import useScore from '../../hooks/useScore';
import { GameSFX } from '../../../../../types';

type Props = {
	tileType: string;
	index: number;
	spriteSrc: string;
	crackSoundName: GameSFX;
	damagedCrackSoundName: GameSFX;
	matched: boolean;
	onDestructed?: () => void;
	className?: string;
};

type DestructibleTileRef = HTMLDivElement;

const DestructibleTile = (props: Props, ref: ForwardedRef<DestructibleTileRef>) => {
	const [damaged, setDamaged] = useState(false);
	const [destroyed, setDestroyed] = useState(false);
	const matchList = useRecoilValue(matchListState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const playAudio = useAudio();

	useScore(props.matched && destroyed, props.index, props.tileType);

	useEffectAfterMount(() => {
		checkMatchInTile();
	}, [matchList]);

	useEffect(() => {
		destroyed && updateTileList();
	}, [destroyed]);

	const checkMatchInTile = () => {
		if (!props.matched) return;

		if (!damaged) {
			playAudio({ audioName: props.crackSoundName });
			setDamaged(true);
			return;
		}

		playAudio({ audioName: props.damagedCrackSoundName });
		props.onDestructed?.();
		setDestroyed(true);
	};

	const updateTileList = () => {
		setLevelTiles((tiles) => {
			const newTiles = structuredClone(tiles);
			newTiles[props.index] = { type: 'Normal' };
			return newTiles;
		});
	};

	return (
		<div
			className={`relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded ${props.className}`}
			data-index={props.index}
			ref={ref}
		>
			<img
				src={props.spriteSrc}
				className="pointer-events-none"
				style={{
					opacity: damaged ? 0.6 : 1,
				}}
			></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-white/80 font-bold">{props.index}</span>
		</div>
	);
};

export default forwardRef<DestructibleTileRef, Props>(DestructibleTile);
