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

const createValidationList = (): void => {
	const { iceTiles, rockTiles, iceCreams } = _levelData.tasks;

	_validationList = [
		{ validate: validateEmtpyTiles, failReason: 'All avaliable tiles must have an item.' },
		{ validate: validateIceTiles, failReason: `Level must contain at least ${iceTiles} ice ${iceTiles === 1 ? 'tile' : 'tiles'}.` },
		{ validate: validateRockTiles, failReason: `Level must contain at least ${rockTiles} rock ${rockTiles === 1 ? 'tile' : 'tiles'}.` },
		{ validate: validateIceCreams, failReason: `Level must contain at least ${iceCreams} ice ${iceCreams === 1 ? 'cream' : 'creams'}.` },
	];
};

type LevelValidation = {
	valid: boolean;
	messages: string[];
};

export default (levelData: LevelData, levelRules: LevelRules): LevelValidation => {
	_levelData = levelData;
	_levelRules = levelRules;

	createValidationList();
	const failedValidations = _validationList.filter((x) => !x.validate()).map((y) => y.failReason);

	return {
		valid: failedValidations.length === 0,
		messages: failedValidations,
	};
};
