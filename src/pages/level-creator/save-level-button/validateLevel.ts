let _levelData: LevelData;
let _levelRules: LevelRules;

type Validation = {
	passed: boolean;
	reason: string;
};

const validateEmtpyTiles = (): Validation => {};

type LevelValidation = {
	valid: boolean;
	messages: string[];
};

export default (levelData: LevelData, levelRules: LevelRules): LevelValidation => {
	_levelData = levelData;
	_levelRules = levelRules;
	
	return {
		valid: false,
		messages: [],
	};
};
