export const COLUMN_NUMBER = 9;
export const ROW_NUMBER = 9;
export const GRID_NUMBER = COLUMN_NUMBER * ROW_NUMBER;
export const TILE_COUNT = COLUMN_NUMBER * ROW_NUMBER;
export const ANIMATION_TIME_MS = 300;
export const ANIMATION_TIME_SECONS = ANIMATION_TIME_MS / 1000;
export const SCORE_RATING = {
	oneStar: 70,
	twoStars: 85,
	threeStars: 100,
};
export const LEVEL_ELEMENTS_SCORES: { [key: string]: number } = {
	Candy: 50,
	SuperCandy: 100,
	Chocolate: 150,
	IceCream: 500,
	IceTile: 500,
	RockTile: 500,
};
export const COMBO_LIMIT = 3;
export const MAIN_LEVELS_COUNT = 50;
