import { useEffect } from 'react';
import { useLevelFXContext } from '../../../../context/LevelFXContext';
import PoofFX from './level-fx/PoofFX';

const getFXComponent = (fx: LevelFX): JSX.Element => {
	switch (fx.type) {
		case 'Poof':
			return <PoofFX></PoofFX>;
		default:
			return <div></div>;
	}
};

const FXGrid = () => {
	const levelFXContext = useLevelFXContext();

	useEffect(() => {
    console.log("mfdsaj");
    
		levelFXContext?.levelFXList.forEach(fx => {
			setTimeout(() => {
				levelFXContext.updateLevelFXList(levelFXContext.levelFXList.filter(x => x !== x));
			}, fx.duration);
		});
	}, [levelFXContext?.levelFXList]);

	return (
		<div id="fx-container" className="absolute top-0 left-0 w-full h-full pointer-events-none">
			{levelFXContext?.levelFXList.map(fx => getFXComponent(fx))}
		</div>
	);
};

export default FXGrid;
