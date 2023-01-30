import LevelElement from './LevelElement';
import iceTileSprite from './../../../assets/img/tiles/ice.png';
import rockTileSprite from './../../../assets/img/tiles/rock.png';
import blueCandySprite from './../../../assets/img/candies/blue.png';
import greenCandySprite from './../../../assets/img/candies/green.png';
import orangeCandySprite from './../../../assets/img/candies/orange.png';
import purpleCandySprite from './../../../assets/img/candies/purple.png';
import redCandySprite from './../../../assets/img/candies/red.png';
import yellowCandySprite from './../../../assets/img/candies/yellow.png';
import superBlueCandySprite from './../../../assets/img/candies/super-blue.png';
import superGreenCandySprite from './../../../assets/img/candies/super-green.png';
import superOrangeCandySprite from './../../../assets/img/candies/super-orange.png';
import superPurpleCandySprite from './../../../assets/img/candies/super-purple.png';
import superRedCandySprite from './../../../assets/img/candies/super-red.png';
import superYellowCandySprite from './../../../assets/img/candies/super-yellow.png';
import chocolateSprite from './../../../assets/img/candies/chocolate.png';
import iceCreamSprite from './../../../assets/img/candies/ice-cream.png';

const LevelElementsPanel = () => {
	return (
		<div className="flex w-full overflow-auto max-w-full bg-s-dark p-[6px] duration-200 rounded gap-x-[10px]">
			<LevelElement imageSrc={iceTileSprite} name="Ice tile"></LevelElement>
			<LevelElement imageSrc={rockTileSprite} name="Rock tile"></LevelElement>
			<LevelElement imageSrc={blueCandySprite} name="Blue candy"></LevelElement>
			<LevelElement imageSrc={greenCandySprite} name="Green candy"></LevelElement>
			<LevelElement imageSrc={orangeCandySprite} name="Orange candy"></LevelElement>
			<LevelElement imageSrc={purpleCandySprite} name="Purple candy"></LevelElement>
			<LevelElement imageSrc={redCandySprite} name="Red candy"></LevelElement>
			<LevelElement imageSrc={yellowCandySprite} name="Yellow candy"></LevelElement>
			<LevelElement imageSrc={superBlueCandySprite} name="Super blue candy"></LevelElement>
			<LevelElement imageSrc={superGreenCandySprite} name="Super green candy"></LevelElement>
			<LevelElement imageSrc={superOrangeCandySprite} name="Super orange candy"></LevelElement>
			<LevelElement imageSrc={superPurpleCandySprite} name="Super purple candy"></LevelElement>
			<LevelElement imageSrc={superRedCandySprite} name="Super red candy"></LevelElement>
			<LevelElement imageSrc={superYellowCandySprite} name="Super yellow candy"></LevelElement>
			<LevelElement imageSrc={chocolateSprite} name="Chocolate"></LevelElement>
			<LevelElement imageSrc={iceCreamSprite} name="Ice cream"></LevelElement>
		</div>
	);
};

export default LevelElementsPanel;
