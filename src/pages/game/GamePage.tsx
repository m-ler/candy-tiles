import CandyTiles from './candy-tiles';

const GamePage = () => {
	return (
		<section id="game-container" className="w-[min(1600px,100%)] m-auto flex p-[20px] gap-x-[15px]">
			<CandyTiles></CandyTiles>
		</section>
	);
};

export default GamePage;
