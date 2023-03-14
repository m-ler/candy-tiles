import CompletedLevelUpdater from './CompletedLevelUpdater';
import GameDialogs from './game-dialogs/GameDialogs';
import LeftPanel from './left-panel';
import LevelContainer from './level-container';
import LevelStateManager from './LevelStateManager';

const CandyTiles = () => {
	return (
		<>
			<LevelStateManager></LevelStateManager>
			<section className="w-[min(100%,860px)] md:w-full max-h-full mx-auto rounded-lg flex md:flex-col items-center gap-[16px] relative ">
				<LeftPanel></LeftPanel>
				<LevelContainer></LevelContainer>
				<GameDialogs></GameDialogs>
				<CompletedLevelUpdater />
			</section>
		</>
	);
};

export default CandyTiles;
