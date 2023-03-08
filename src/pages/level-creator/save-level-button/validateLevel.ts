import { supabase } from '../../../config/supabase-config';

type Validation = {
	validate: () => boolean;
	failReason: string;
};

let _levelData: LevelData;
let _levelRules: LevelRules;
let _validationList: Validation[];

const validateEmtpyTiles = (): boolean => _levelData.initialTiles.every((tile, index) => !tile || _levelData.initialItems[index] !== null);
const validateIceTiles = (): boolean => _levelRules.tasks.iceTiles <= _levelData.initialTiles.filter((x) => x?.type === 'Ice').length;
const validateRockTiles = (): boolean => _levelRules.tasks.rockTiles <= _levelData.initialTiles.filter((x) => x?.type === 'Rock').length;
const validateIceCreams = (): boolean =>
	_levelRules.tasks.iceCreams <= _levelData.initialItems.filter((x) => x?.type === 'IceCream').length;
const validateEmptyTitle = (): boolean => _levelData.title?.trim() !== '';

const createValidationList = (): void => {
	const { iceTiles, rockTiles, iceCreams } = _levelData.tasks;

	_validationList = [
		{ validate: validateEmtpyTiles, failReason: 'All avaliable tiles must have an item.' },
		{ validate: validateIceTiles, failReason: `Level must contain at least ${iceTiles} ice ${iceTiles === 1 ? 'tile' : 'tiles'}.` },
		{ validate: validateRockTiles, failReason: `Level must contain at least ${rockTiles} rock ${rockTiles === 1 ? 'tile' : 'tiles'}.` },
		{ validate: validateIceCreams, failReason: `Level must contain at least ${iceCreams} ice ${iceCreams === 1 ? 'cream' : 'creams'}.` },
		{ validate: validateEmptyTitle, failReason: 'Level title is empty.' },
	];
};

type LevelValidation = {
	valid: boolean;
	messages: string[];
};

export default async (levelData: LevelData, levelRules: LevelRules): Promise<LevelValidation> => {
	_levelData = levelData;
	_levelRules = levelRules;

	createValidationList();
	const failedValidations = _validationList.filter((x) => !x.validate()).map((y) => y.failReason);
	const duplicatedLevelTitle = ((await supabase.from('levels').select('title').eq('title', levelData.title?.trim())).data?.length || 0) > 0;
	duplicatedLevelTitle && failedValidations.push('One of your levels already has that title.');

	return {
		valid: failedValidations.length === 0,
		messages: failedValidations,
	};
};
