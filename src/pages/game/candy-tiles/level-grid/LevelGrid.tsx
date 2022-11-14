import Tile from "./Tile";

const LevelGrid = () => {
	return (
		<section className="grid bg-purple/50 border border-white grow aspect-square rounded-lg grid-rows-[repeat(9,1fr)] grid-cols-[repeat(9,1fr)] overflow-hidden">
			{Array.from(Array(81).keys()).map((tile, index) => (
				<Tile key={index}></Tile>
			))}
		</section>
	);
};

export default LevelGrid;
