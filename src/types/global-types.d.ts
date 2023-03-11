import { AlertColor } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { LevelDb } from './database-aliases';

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

	type UserProfileData = {
		uid: string;
		email: string;
		nickname: string;
		firstLetter: string;
		avatarURL: string;
		latestUpdateTime: number;
		likedLevels: number[];
		dislikedLevels: number[];
	};

	type LoggedUserData = {
		profile: UserProfileData;
		auth: User;
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

	type LevelFile = {
		id: number;
		title: string | null;
		initialItems: LevelItem[];
		initialTiles: LevelTile[];
		score: number;
		maximumMoves: number;
		tasks: LevelTasks;
	};

	type LevelData = LevelDb & { file: LevelFile; isMainLevel: boolean };

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
