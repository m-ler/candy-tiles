export { }

declare global {

  type CandyColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple';

  type Candy = {
    color: CandyColor,
  };

  type TileVariation = "Normal" | "Frozen" | "Thick"

  type Tile = {
    type: TileVariation,
  };

  type LevelItem = {
    type: Candy,
    onSwap: () => void,
    index: number
  };
}