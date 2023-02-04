import { AlertColor } from '@mui/material';

export {};

declare global {
	type LevelRules = {
		targetScore: number;
		maximumMoves: number;
		tasks: LevelTasks;
	};

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

	const gameSFXList = [
		'buttonClick1',
		'candyBounce',
		'chocolateMatch',
		'fusionMatch',
		'gameOver',
		'iceCrack1',
		'iceCrack2',
		'iceCreamMatch',
		'levelComplete',
		'match',
		'pop1',
		'put1',
		'rockCrack1',
		'rockCrack2',
		'starScore',
		'superCandyMatch',
		'taskComplete',
		'tileClick',
		'woosh1',
	] as const;

	type GameSFX = typeof gameSFXList[number];

	type Toast = { message: string; durationMs: number; severity: AlertColor };
}
