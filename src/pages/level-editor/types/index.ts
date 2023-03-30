import { LevelRules } from '../../../types';
import { LevelItem, LevelTile } from '../../game/candy-tiles/types';

export type LevelEditorElement = {
	id: number;
	name: string;
	type: 'Tile' | 'Item';
	elementObj: LevelTile | LevelItem;
	spriteSrc: string;
};

export type LevelDataEditor = {
	slotList: boolean[];
	tileList: (LevelEditorElement | null)[];
	itemList: (LevelEditorElement | null)[];
	levelRules: LevelRules;
	levelTitle: string;
};
