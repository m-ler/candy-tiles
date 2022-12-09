import red from './../../../../../assets/candies/red.png';
import orange from './../../../../../assets/candies/orange.png';
import yellow from './../../../../../assets/candies/yellow.png';
import green from './../../../../../assets/candies/green.png';
import blue from './../../../../../assets/candies/blue.png';
import purple from './../../../../../assets/candies/purple.png';
import { useEffect, useState } from 'react';
import useFirstRender from '../../../../../hooks/useFirstRender';
import CandyPopFX from '../items-fx/CandyPopFX';
import LevelManager from '../level-manager';

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
	const [showFX, setShowFX] = useState(false);
	const firstRender = useFirstRender();
	useEffect(() => {
		firstRender && setPositionY(0);
		LevelManager.subscribeItemsChange(onLevelItemsChanged);

		return () => {
			LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
		};
	}, []);

	const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
		const itemMatched = !items.some(x => x?.key === id);
		//if (!itemUsedRef.current) return;
		if (itemMatched) {
			setShowFX(true);
			console.log('set show');

			return;
		}
	};

	const updateOpacity = (value: string): void => {
		//if (elementRef.current) elementRef.current.style.opacity = value;
	};

	return (
		<span className="relative w-full h-full block">
			{showFX ? (
				<CandyPopFX candyColor={color}></CandyPopFX>
			) : (
				<img
					data-candy
					data-color={color}
					src={candyImages[color]}
					className="block w-full h-full m-0 select-none pointer-events-none relative duration-200"
					style={{
						transform: `translateY(${positionY}%)`,
					}}
				></img>
			)}
		</span>
	);
};

export default Candy;
