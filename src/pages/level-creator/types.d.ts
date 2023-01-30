export {};

declare global {
	type LevelEditorElement = {
		id: number;
		name: string;
		type: 'Tile' | 'Item';
		elementObj: LevelTile | LevelItem;
		spriteSrc: string;
	};
}
