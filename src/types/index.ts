import { AlertColor } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { LevelItem, LevelTasks, LevelTile } from '../pages/game/candy-tiles/types';
import { CompletedLevels } from '../store/completedLevels';
import { LevelDb } from './database-aliases';

export type UserData = {
	email: string;
	nickname: string;
	password: string;
};

export type UserProfileData = {
	id: number;
	uid: string;
	email: string;
	nickname: string;
	firstLetter: string;
	avatarURL: string;
	latestUpdateTime: number;
	likedLevels: number[];
	dislikedLevels: number[];
	completedLevels: CompletedLevels;
};

export type LoggedUserData = {
	profile: UserProfileData;
	auth: User;
};

export type SignInData = {
	email: string;
	password: string;
};

export type FieldValidationResult = {
	valid: boolean;
	validationMessage: string;
};

export type FieldValidation<T> = {
	validate: (fieldValue: T) => boolean | Promise<boolean>;
	failReason: string;
};

export type LevelRules = {
	targetScore: number;
	maximumMoves: number;
	tasks: LevelTasks;
};

export type LevelFile = {
	id: number;
	title: string | null;
	initialItems: LevelItem[];
	initialTiles: LevelTile[];
	score: number;
	maximumMoves: number;
	tasks: LevelTasks;
};

export type LevelData = LevelDb & { file: LevelFile; isMainLevel: boolean };

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

export type GameSFX = (typeof gameSFXList)[number];

export type Toast = { message: string; durationMs: number; severity: AlertColor };
