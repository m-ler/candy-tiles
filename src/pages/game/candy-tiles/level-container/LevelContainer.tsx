import TileGrid from './grids/TileGrid';
import ItemGrid from './grids/ItemGrid';
import LevelManager from './level-manager/LevelManager';
import DelayComponent from '../../../../components/DelayComponent';
import { ANIMATION_TIME_MS } from '../../../../config';
import FXGrid from './grids/FXGrid';
import { useRecoilValue } from 'recoil';
import { gameOverState } from '../store/gameOver';
import anime from 'animejs';
import { levelCompleteState } from '../store/levelComplete';

const animateLevelComplete = () => {
	anime({
		targets: '#level-container',
		filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
		duration: 5000,
		easing: 'linear',
		loop: true,
	});
};

const animateGameOver = () => {
	anime({
		targets: '#level-container',
		filter: ['grayscale(0)', 'grayscale(0.8)'],
		duration: 1000,
		easing: 'linear',
	});
};

const LevelContainer = () => {
	const gameOver = useRecoilValue(gameOverState);
	const levelComplete = useRecoilValue(levelCompleteState);

	levelComplete && animateLevelComplete();
	gameOver && animateGameOver();

	return (
		<div className='w-full grow overflow-hidden'>
			<section id="level-container" className="max-w-full max-h-full mx-auto md:my-auto aspect-square rounded-lg overflow-hidden relative select-none">
				<LevelManager></LevelManager>
				<TileGrid></TileGrid>
				<DelayComponent delayMs={ANIMATION_TIME_MS}>
					<ItemGrid></ItemGrid>
				</DelayComponent>
				<FXGrid></FXGrid>
			</section>
		</div>
	);
};

export default LevelContainer;
