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

  type LevelItem = Candy | Tile;

  type MatchList = { index: number; matched: boolean }[]
}  