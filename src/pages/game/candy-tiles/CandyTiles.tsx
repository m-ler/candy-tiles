import DialogManger from './game-ui';
import StartLevelDialog from './game-ui/start-level-dialog/StartLevelDialog';
import LevelContainer from './level-container';
import ScorePanel from './score-panel';

const CandyTiles = () => {
	return (
		<section className='w-[min(100%,860px)] max-h-full mx-auto rounded-lg shadow-lg flex items-center gap-x-[15px] relative'>
			<ScorePanel></ScorePanel>
			<LevelContainer></LevelContainer>
			<DialogManger></DialogManger>
		</section>
	);
};

export default CandyTiles;
