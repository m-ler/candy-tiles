import red from './../../../../../assets/candies/red.png';
import orange from './../../../../../assets/candies/orange.png';
import yellow from './../../../../../assets/candies/yellow.png';
import green from './../../../../../assets/candies/green.png';
import blue from './../../../../../assets/candies/blue.png';
import purple from './../../../../../assets/candies/purple.png';
import { useEffect, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';

const candyImages: { [key: string]: string } = {
	'Red': red,
	'Orange': orange,
	'Yellow': yellow,
	'Green': green,
	'Blue': blue,
	'Purple': purple,
};

export const CandyColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

type CandyProps = {
	color: CandyColor;
	id: string;
};

const Candy = ({ color, id }: CandyProps) => {
	const [positionY, setPositionY] = useState(-500);
	const firstRender = useFirstRender();
	useEffect(() => {
		firstRender && setPositionY(0);
	}, []);

	return (
		<img
			data-candy
			data-color={color}
			src={candyImages[color]}
			className="block w-full h-full m-0 select-none pointer-events-none relative duration-200"
			style={{
				transform: `translateY(${positionY}%)`,
			}}
		></img>
	);
};

export default Candy;
