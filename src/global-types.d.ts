import { AlertColor } from '@mui/material';

export {};

declare global {
	interface Window {
		gameVolume: number;
	}

	type UserData = {
		email: string;
		nickname: string;
		password: string;
	};

	type LoggedUserData = {
		uid: string;
		email: string;
		nickname: string;
		firstLetter: string;
		avatarURL: string;
		latestUpdateTime: number;
	};

	type UserDocument = {
		email: string;
		nickname: string;
		passedLevels: number[];
		password: string;
		photoURL: string;
	};

	type SignInData = {
		email: string;
		password: string;
	};

	type UserDocData = {
		uid: string;
		email: string;
		nickname: string;
		password: string;
	};

	type FieldValidationResult = {
		valid: boolean;
		validationMessage: string;
	};

	type FieldValidation<T> = {
		validate: (fieldValue: T) => boolean | Promise<boolean>;
		failReason: string;
	};

	type LevelRules = {
		targetScore: number;
		maximumMoves: number;
		tasks: LevelTasks;
	};

	type LevelData = {
		id: number;
		type: 'Main' | 'Online';
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

	type GameSFX = (typeof gameSFXList)[number];

	type Toast = { message: string; durationMs: number; severity: AlertColor };

	interface Array<T> {
		findLastIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
	}
}
