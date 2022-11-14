import CandyTiles from './candy-tiles/CandyTiles';
import LevelSelector from './level-selector';

const GamePage = () => {
	return (
		<section className="w-screen m-auto border border-white min-h-[600px] max-h-[700px] flex p-[20px] gap-x-[15px]">
			<LevelSelector></LevelSelector>
      <CandyTiles></CandyTiles>
		</section>
	);
};

export default GamePage;
