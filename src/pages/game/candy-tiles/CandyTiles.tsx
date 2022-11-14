import ScorePanel from './score-panel';

const CandyTiles: React.FC = () => {
	return (
		<section className="w-[min(100%,1000px)] mr-auto rounded-lg shadow-lg flex items-center">
			<ScorePanel></ScorePanel>
		</section>
	);
};

export default CandyTiles;
