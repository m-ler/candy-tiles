export {};

declare global {
	type LevelEditorElement = {
		id: number;
		name: string;
		type: 'Tile' | 'Item';
		elementObj: LevelTile | LevelItem;
		spriteSrc: string;
	};

	type LevelDataEditor = {
		slotList: boolean[];
		tileList: (LevelEditorElement | null)[];
		itemList: (LevelEditorElement | null)[];
		levelRules: LevelRules;
		levelTitle: string;
	};
}
