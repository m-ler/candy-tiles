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

export default [
	{
		id: 1,
		name: 'Ice tile',
		type: 'Tile',
		elementObj: {
			type: 'Ice',
		},
		spriteSrc: iceTileSprite,
	},
	{
		id: 2,
		name: 'Rock tile',
		type: 'Tile',
		elementObj: {
			type: 'Rock',
		},
		spriteSrc: rockTileSprite,
	},
	{
		id: 3,
		type: 'Item',
		name: 'Blue candy',
		elementObj: {
			type: 'Candy',
			color: 'Blue',
		},
		spriteSrc: blueCandySprite,
	},
	{
		id: 4,
		name: 'Green candy',
		type: 'Item',
		elementObj: {
			type: 'Candy',
			color: 'Green',
		},
		spriteSrc: greenCandySprite,
	},
	{
		id: 5,
		name: 'Orange candy',
		type: 'Item',
		elementObj: {
			type: 'Candy',
			color: 'Orange',
		},
		spriteSrc: orangeCandySprite,
	},
	{
		id: 6,
		name: 'Purple candy',
		type: 'Item',
		elementObj: {
			type: 'Candy',
			color: 'Purple',
		},
		spriteSrc: purpleCandySprite,
	},
	{
		id: 7,
		name: 'Red candy',
		type: 'Item',
		elementObj: {
			type: 'Candy',
			color: 'Red',
		},
		spriteSrc: redCandySprite,
	},
	{
		id: 8,
		name: 'Yellow candy',
		type: 'Item',
		elementObj: {
			type: 'Candy',
			color: 'Yellow',
		},
		spriteSrc: yellowCandySprite,
	},
	{
		id: 9,
		name: 'Super blue candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Blue',
		},
		spriteSrc: superBlueCandySprite,
	},
	{
		id: 10,
		name: 'Super green candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Green',
		},
		spriteSrc: superGreenCandySprite,
	},
	{
		id: 11,
		name: 'Super orange candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Orange',
		},
		spriteSrc: superOrangeCandySprite,
	},
	{
		id: 12,
		name: 'Super purple candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Purple',
		},
		spriteSrc: superPurpleCandySprite,
	},
	{
		id: 13,
		name: 'Super red candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Red',
		},
		spriteSrc: superRedCandySprite,
	},
	{
		id: 14,
		name: 'Super yellow candy',
		type: 'Item',
		elementObj: {
			type: 'SuperCandy',
			color: 'Yellow',
		},
		spriteSrc: superYellowCandySprite,
	},
	{
		id: 15,
		name: 'Chocolate',
		type: 'Item',
		elementObj: {
			type: 'Chocolate',
		},
		spriteSrc: chocolateSprite,
	},
	{
		id: 16,
		name: 'Ice cream',
		type: 'Item',
		elementObj: {
			type: 'IceCream',
		},
		spriteSrc: iceCreamSprite,
	},
] as LevelEditorElement[];
