import LevelTasks from './LevelTasks';
import MoveCounter from './MoveCounter';
import ScoreBar from './ScoreBar';

const LevelProgressPanel = () => {
	return (
		<div className="min-w-[180px] bg-black/25 rounded-lg p-[16px] md:p-[12px] items-center flex flex-col md:flex-row gap-[30px] md:gap-[12px] md:overflow-auto">
			<ScoreBar></ScoreBar>
			<MoveCounter></MoveCounter>
			<LevelTasks></LevelTasks>
		</div>
	);
};

export default LevelProgressPanel;
