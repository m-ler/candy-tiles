const COLUMN_NUMBER = 9;
const ROW_NUMBER = 9;

const ADJACENT_INDEXES = [-COLUMN_NUMBER, 1, COLUMN_NUMBER, -1];

export const tilesAreAdjacent = (firstIndex: number, secondIndex: number): boolean => {
  const areAdjacent = ADJACENT_INDEXES.some(x => (x + firstIndex) === secondIndex);
  return areAdjacent;
};


type TileMovePosition = [number, number];

export const getTileTargetPosition = (index: number, tileTargetIndex: number): TileMovePosition => {
  const top = tileTargetIndex === index - ROW_NUMBER ? -100 : tileTargetIndex === index + ROW_NUMBER ? 100 : 0;
  const left = tileTargetIndex === index - 1 ? -100 : tileTargetIndex === index + 1 ? 100 : 0;
  return [top, left];
};

export const checkForMatchings = (): boolean => {
  return false; 
}