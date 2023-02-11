import useMountAnimation from '../../../hooks/useMountAnimation';
import GameDialogs from './game-dialogs/GameDialogs';
import LeftPanel from './left-panel';
import LevelContainer from './level-container';
import LevelStateManager from './LevelStateManager';
import ScoreManager from './ScoreManager';

const CandyTiles = () => {
	useMountAnimation('#game-container');

	return (
		<>
			<LevelStateManager></LevelStateManager>
			<ScoreManager></ScoreManager>
			<section className="w-[min(100%,860px)] md:w-full max-h-full mx-auto rounded-lg flex md:flex-col items-center gap-[16px] relative ">
				<LeftPanel></LeftPanel>
				<LevelContainer></LevelContainer>
				<GameDialogs></GameDialogs>
			</section>
		</>
	);
};

export default CandyTiles;
