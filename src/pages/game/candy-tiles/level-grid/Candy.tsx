import red from './../../../../assets/candies/red.png';
import orange from './../../../../assets/candies/orange.png';
import yellow from './../../../../assets/candies/yellow.png';
import green from './../../../../assets/candies/green.png';
import blue from './../../../../assets/candies/blue.png';
import purple from './../../../../assets/candies/purple.png';

console.log(red);

export const CandyColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

const candyImages: { [key: string]: string } = {
	'Red': red,
	'Orange': orange,
	'Yellow': yellow,
	'Green': green,
	'Blue': blue,
	'Purple': purple,
};

type CandyProps = {
	color: string;
};

const Candy = (props: CandyProps) => {
	return (
		<div className="w-full aspect-square block p-[15%]">
			<img src={candyImages[props.color]} className="block rounded-full w-full h-full m-0 select-none pointer-events-none"></img>
		</div>
	);
};

export default Candy;
