import { useEffect, useRef } from 'react';
import { levelList } from '../../../../data/level-layouts';
import { useLevelContext } from '../../../../context/LevelContext';
import LevelManager from './level-manager';
import uuid from 'react-uuid';
import TileGrid from './TileGrid';
import ItemGrid from './ItemGrid';

const LevelGrid = () => {
	const selectedLevelLayout = levelList[0];
	const levelContext = useLevelContext();
	const levelGridElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const initialItems = selectedLevelLayout.items;
		initialItems.forEach(x => x !== null && (x.key = uuid()));

		const initialTiles = selectedLevelLayout.tiles;

		levelContext?.updateLevelItems(initialItems);
		LevelManager.setItems(initialItems, false);
		LevelManager.setTiles(initialTiles, false);
		LevelManager.subscribeComboStart(onComboStart);
		LevelManager.subscribeComboEnd(onComboEnd);

		return () => {
			LevelManager.unsubscribeComboStart(onComboStart);
			LevelManager.unsubscribeComboEnd(onComboEnd);
		};
	}, []);

	const onComboStart = (): void => {
		if (levelGridElement.current) levelGridElement.current.style.pointerEvents = 'none';
	};
	const onComboEnd = (): void => {
		if (levelGridElement.current) levelGridElement.current.style.pointerEvents = 'all';
	};

	return (
		<section className="grow aspect-square rounded-lg overflow-hidden relative select-none" ref={levelGridElement}>
			<TileGrid tiles={selectedLevelLayout.tiles}></TileGrid>
			<ItemGrid tiles={selectedLevelLayout.tiles}></ItemGrid>
		</section>
	);
};

export default LevelGrid;
