export { }

declare global {

  type LevelItem = {
    index?: number,
    type: "Candy" | "Chocolate"
  };

  type CandyColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple';

  type Candy = {
    color: CandyColor,
  } & LevelItem;

  type TileVariation = "Normal" | "Frozen" | "Thick"

  type Tile = {
    type: TileVariation,
  };
}  