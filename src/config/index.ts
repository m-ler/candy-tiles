export const COLUMN_NUMBER = parseInt(import.meta.env.VITE_COLUMN_NUMBER);
export const ROW_NUMBER = parseInt(import.meta.env.VITE_ROW_NUMBER);
export const GRID_NUMBER = COLUMN_NUMBER * ROW_NUMBER;
export const TILE_COUNT = COLUMN_NUMBER * ROW_NUMBER;
export const ANIMATION_TIME_MS = parseInt(import.meta.env.VITE_ANIMATION_TIME_MS);
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
