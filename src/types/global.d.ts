export { }

declare global {
  type CandyColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple';

  type Candy = {
    color: CandyColor,
    type: "Candy",
    key?: string
  };

  type SuperCandy = {
    color: CandyColor,
    type: "SuperCandy",
    key?: string
  };

  type Chocolate = {
    type: "Chocolate",
    key?: string
  };

  type Tile = {
    type: "Normal" | "Frozen" | "Thick",
  };

  type LevelItem = Candy | SuperCandy | Chocolate | null;
  type LevelTile = Tile | null;

  type MatchDetail = {
    up: number, right: number, down: number, left: number, index: number, matched: boolean
  };

  type MatchResult = {
    thereWereMatches: boolean,
    matchingList: MatchDetail[]
  };

  type LevelRuntimeData = {
    items: LevelItem[],
    tiles: LevelTile[],
    prevItems: LevelItem[],
    matchResult: MatchResult
    actionsLocked: boolean,
    comboCount: number,
    swappedItems: [number | null, number | null]
  };
}  