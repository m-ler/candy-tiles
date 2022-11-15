const COLUMN_NUMBER = 9;
const ROW_NUMBER = 9;

const ADJACENT_INDEXES = [-COLUMN_NUMBER, 1, COLUMN_NUMBER, -1];

export const tilesAreAdjacent = (firstIndex: number, secondIndex: number): boolean => {
  const areAdjacent = ADJACENT_INDEXES.some(x => (x + firstIndex) === secondIndex);
  return areAdjacent;
};