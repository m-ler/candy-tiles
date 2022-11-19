import red from './../../../../assets/candies/red.png';
import orange from './../../../../assets/candies/orange.png';
import yellow from './../../../../assets/candies/yellow.png';
import green from './../../../../assets/candies/green.png';
import blue from './../../../../assets/candies/blue.png';
import purple from './../../../../assets/candies/purple.png';
import { forwardRef, useEffect, useState } from 'react';
import { useLevelContext } from '../../../../context/LevelContext';
import { checkForMatchings, getTileTargetPosition } from '../../../../utils/tile-matching';
import uuid from 'react-uuid';

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
	color: CandyColor;
	index: number;
};

const Candy = forwardRef<HTMLDivElement | null, CandyProps>(({ color, index }: CandyProps, ref) => {
	const [position, setPosition] = useState([0, 0]);
	const [key, setKey] = useState(uuid());
	const levelContext = useLevelContext();

	useEffect(() => {
		if (!levelContext?.selectedTiles.includes(index)) return;
		const otherItemIndex = levelContext?.selectedTiles.find(x => x !== index) || 0;
		const targetPosition = getTileTargetPosition(index, otherItemIndex);
		setPosition(targetPosition);

//    if (levelContext.selectedTiles[0] !== index) return;
    
		setTimeout(() => {
			const newItems = [...levelContext.currentLevelItems];
			newItems[index] = levelContext.currentLevelItems[otherItemIndex];
			newItems[otherItemIndex] = levelContext.currentLevelItems[index];

			const thereWereMatchings = checkForMatchings();
			thereWereMatchings ? levelContext.updateLevelItems(newItems) : setPosition([0, 0]);
		}, 200);
	}, [levelContext?.selectedTiles]);

	useEffect(() => {
		if (!levelContext?.selectedTiles.includes(index)) return;
		setPosition([0, 0]);
		setKey(uuid());
		//console.log(levelContext?.currentLevelItems);
	}, [levelContext?.currentLevelItems]);

	return (
		<div
			key={key}
			className={`w-full aspect-square block p-[15%] relative duration-200`}
			style={{ top: `${position[0]}%`, left: `${position[1]}%` }}
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
