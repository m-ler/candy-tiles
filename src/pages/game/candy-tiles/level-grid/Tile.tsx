import Candy, { CandyColors } from "./Candy";

const Tile = () => {

  return (
		<div className="relative border border-purple hover:bg-light-yellow/50 duration-200 select-none">
			<Candy color={CandyColors[Math.floor(Math.random() * CandyColors.length)]}></Candy>
		</div>
	);
};

export default Tile;