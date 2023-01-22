import { useRef } from 'react';
import TileGrid from './grids/TileGrid';
import ItemGrid from './grids/ItemGrid';
import LevelManager from './level-manager/LevelManager';
import DelayComponent from '../../../../components/DelayComponent';
import { ANIMATION_TIME_MS } from '../../../../config';
import FXGrid from './grids/FXGrid';

const LevelContainer = () => {
	const levelGridElement = useRef<HTMLElement | null>(null);

	return (
		<section
			className='grow aspect-square rounded-lg overflow-hidden relative select-none'
			ref={levelGridElement}
			/* style={{
				filter: levelMoves.spendAllMoves ? 'grayscale(0.8)' : '',
			}} */
		>
			<LevelManager></LevelManager>
			<TileGrid></TileGrid>
			<DelayComponent delayMs={ANIMATION_TIME_MS}>
				<ItemGrid></ItemGrid>
			</DelayComponent>
			<FXGrid></FXGrid>
		</section>
	);
};

export default LevelContainer;
