import TileGrid from './grids/TileGrid';
import ItemGrid from './grids/ItemGrid';
import LevelManager from './level-manager/LevelManager';
import DelayComponent from '../../../../components/DelayComponent';
import { ANIMATION_TIME_MS } from '../../../../config';
import FXGrid from './grids/FXGrid';
import { useRecoilValue } from 'recoil';
import { gameOverState } from '../selectors/gameOver';
import anime from 'animejs';

const animateLevelContainerFilter = () => {
	anime({
		targets: '#level-container',
		filter: ['grayscale(0)', 'grayscale(0.8)'],
		duration: 1000,
		easing: 'linear'
	});
};
const LevelContainer = () => {
	const gameOver = useRecoilValue(gameOverState);

	gameOver && animateLevelContainerFilter();

	return (
		<section id="level-container" className="grow aspect-square rounded-lg overflow-hidden relative select-none">
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
