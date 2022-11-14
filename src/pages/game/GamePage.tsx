import CandyTiles from './candy-tiles/CandyTiles';
import LevelSelector from './level-selector';

const GamePage: React.FC = () => {
	return (
		<section className="w-screen m-auto border border-white min-h-[800px] flex p-[20px] gap-x-[15px]">
			<LevelSelector></LevelSelector>
      <CandyTiles></CandyTiles>
		</section>
	);
};

export default GamePage;
