import GameOverWindow from './in-game-ui/GameOverWindow';
import StartLevelWindow from './in-game-ui/StartLevelWindow';
import LevelContainer from './level-container';
import ScorePanel from './score-panel';

const CandyTiles = () => {
	return (
		<section className='w-[min(100%,860px)] max-h-full mr-auto rounded-lg shadow-lg flex items-center gap-x-[15px] relative'>
			<ScorePanel></ScorePanel>
			<LevelContainer></LevelContainer>
			<StartLevelWindow></StartLevelWindow>
			<GameOverWindow></GameOverWindow>
		</section>
	);
};

export default CandyTiles;
