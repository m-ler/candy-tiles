import red from './../../../../assets/candies/red.png';
import orange from './../../../../assets/candies/orange.png';
import yellow from './../../../../assets/candies/yellow.png';
import green from './../../../../assets/candies/green.png';
import blue from './../../../../assets/candies/blue.png';
import purple from './../../../../assets/candies/purple.png';
import { forwardRef, useEffect } from 'react';

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
	index: number;
};

const Candy = forwardRef<HTMLDivElement | null, CandyProps>(({ color, index }: CandyProps, ref) => {
	useEffect(() => {
	}, [color]);

	return (
		<div
			className="w-full aspect-square block p-[15%] relative left-[0px] top-[0px] duration-200"
			data-candy
			ref={ref}
			data-index={index}
			data-color={color}
		>
			<img src={candyImages[color]} className="block rounded-full w-full h-full m-0 select-none pointer-events-none"></img>
		</div>
	);
});

export default Candy;
