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

type CandyInLevel = { index: number } & Candy;

type CandyMatchings = {
  up: number, right: number, down: number, left: number, matched: boolean
};

const getCandyMatchings = (candy: CandyInLevel, itemList: readonly (LevelItem | null)[]): CandyMatchings => {
  //console.log(candy.index);
  const matchings = {
    "up": { count: 0, getAdjacent: (cycle: number) => candy.index - (COLUMN_NUMBER * cycle) },
    "right": { count: 0, getAdjacent: (cycle: number) => candy.index + cycle },
    "down": { count: 0, getAdjacent: (cycle: number) => candy.index + (COLUMN_NUMBER * cycle) },
    "left": { count: 0, getAdjacent: (cycle: number) => candy.index - cycle },
  };

  Object.values(matchings).forEach(direction => {
    for (let i = 1; i < ROW_NUMBER + 1; i++) {
      const adjacentCandy = itemList[direction.getAdjacent(i)] || null;
      if ((adjacentCandy as Candy)?.color !== candy.color) break;
      direction.count += 1;
    }
  });

  const up = matchings.up.count;
  const right = matchings.right.count;
  const down = matchings.down.count;
  const left = matchings.left.count;
  const matched = (up > 0 && down > 0) || (left > 0 && right > 0) || [up, down, left, right].some(x => x > 1);

  /* console.log({
    up, right, down, left, matched
  });
 */
  return { up, right, down, left, matched };
};

type MatchResult = {
  thereWereMatches: boolean,
  matchingList: MatchList
};

export const checkForMatchings = (itemList: readonly (LevelItem | null)[]): MatchResult => {
  const candies = [...itemList].map((x, index) => ({ ...x, index })).filter(x => (x as Candy)?.type === "Candy") as CandyInLevel[];

  const candyMatchings: ({ index: number } & CandyMatchings)[] = [];
  candies.forEach(candy => candyMatchings.push({ index: candy.index, ...getCandyMatchings(candy, itemList) }));

  return {
    thereWereMatches: candyMatchings.some(x => x.matched),
    matchingList: candyMatchings.map(x => {
      return { index: x.index, matched: x.matched }
    }) as MatchList
  };
};

