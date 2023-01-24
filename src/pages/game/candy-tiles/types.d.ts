export {};

declare global {
	type CandyColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple' | 'White';

	type Candy = {
		color: CandyColor;
		type: 'Candy';
		id?: string;
	};

	type SuperCandy = {
		color: CandyColor;
		type: 'SuperCandy';
		id?: string;
	};

	type Chocolate = {
		type: 'Chocolate';
		id?: string;
	};

	type IceCream = {
		type: 'IceCream';
		id?: string;
	};

	type Tile = {
		type: 'Normal' | 'Ice' | 'Rock';
	};

	type LevelItem = Candy | SuperCandy | Chocolate | IceCream | null;
	type LevelTile = Tile | null;

	type MatchDetail = {
		up: number;
		right: number;
		down: number;
		left: number;
		index: number;
		matched: boolean;
	};

	type MatchGroup = number[];

	type MatchResult = {
		thereWereMatches: boolean;
		matchingList: MatchDetail[];
		matchingGroups: MatchGroup[];
	};

	type LevelRuntimeData = {
		previousItems: string;
		items: LevelItem[];
		tiles: LevelTile[];
		matchResult: MatchResult;
		actionsLocked: boolean;
		comboCount: number;
		swappedItems: [number | null, number | null];
		latestSwappedCandyColor: string;
	};

	type SwappedItems = [number | null, number | null];

	type ScoreFx = {
		index: number;
		color: CandyColor;
		score: number;
		type: 'Score';
		id: 'string';
	};

	type SuperCandyFX = {
		position: [number, number];
		color: CandyColor;
		index: number;
		type: 'SuperCandy';
		id: 'string';
	};

	type LevelFX = ScoreFx | SuperCandyFX;

	type LevelTasks = {
		iceCreams: number;
		iceTiles: number;
		rockTiles: number;
	};
}
