type LevelDataEditor = {
	slotList: boolean[];
	tileList: (LevelEditorElement | null)[];
	itemList: (LevelEditorElement | null)[];
	levelRules: LevelRules;
};

export default ({ levelRules, itemList, slotList, tileList }: LevelDataEditor): LevelData => ({
	id: 0,
	userId: '',
	maximumMoves: levelRules.maximumMoves,
	rating: null,
	score: levelRules.targetScore,
	initialItems: itemList.map((x) => (x?.elementObj ? (x.elementObj as LevelItem) : null)),
	initialTiles: tileList.map((x, i) => {
		const slotAvaliable = slotList[i];
		const tile: LevelTile = x?.elementObj ? (x.elementObj as LevelTile) : { type: 'Normal' };
		return slotAvaliable ? tile : null;
	}),
	tasks: levelRules.tasks,
});
