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
export const LEVEL_ELEMENTS_SCORES = {
	candy: 100,
	superCandy: 250,
	chocolate: 500,
	iceCream: 1000,
	iceTile: 1000,
	rockTile: 1000,
};
