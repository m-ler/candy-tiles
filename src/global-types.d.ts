export {};

declare global {
	type LevelData = {
		id: number;
		userId: string;
		initialItems: LevelItem[];
		initialTiles: LevelTile[];
		score: number;
		maximumMoves: number;
		tasks: LevelTasks;
		rating: number | null;
	};
}
