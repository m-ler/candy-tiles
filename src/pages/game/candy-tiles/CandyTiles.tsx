import LevelGrid from './level-grid';
import ScorePanel from './score-panel';

const CandyTiles = () => {
	return (
		<section className="w-[min(100%,900px)] max-h-full mr-auto rounded-lg shadow-lg flex items-center gap-x-[15px]">
			<ScorePanel></ScorePanel>
			<LevelGrid></LevelGrid>
		</section>
	);
};

export default CandyTiles;
