export { }

declare global {

  type CandyColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple';

  type Candy = {
    color: CandyColor,
    type: "Candy",
  };

  type Tile = {
    type: "Normal" | "Frozen" | "Thick",
  };

  type LevelItem = Candy | null;
  type LevelTile = Tile | null;

  type MatchData = { index: number; matched: boolean }


  type LevelRuntimeData = {
    items: LevelItem[],
    tiles: LevelTile[],
    prevItems: LevelItem[],
    matchList: MatchData[],
    matched: boolean
  };
}  