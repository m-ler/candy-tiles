type LevelLayout = {
  items: (Candy | Tile)[],
  tiles: (Tile | null)[]
};

export const levelList: LevelLayout[] = [
  {
    items: [
      { type: "Candy", color: "Blue" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Green" },
      { type: "Candy", color: "Green" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Orange" },
      { type: "Candy", color: "Orange" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Purple" },
      { type: "Candy", color: "Purple" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Purple" },
      { type: "Candy", color: "Red" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Orange" },
      { type: "Candy", color: "Green" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Green" },
      { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Green" },
      { type: "Candy", color: "Purple" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Red" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Orange" },
      { type: "Candy", color: "Blue" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Yellow" }, { type: "Candy", color: "Blue" }, { type: "Candy", color: "Purple" }, { type: "Candy", color: "Green" }, { type: "Candy", color: "Orange" }, { type: "Candy", color: "Purple" },
    ],
    tiles: [
      null, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, null,
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" },
      null, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, { type: "Normal" }, null,
    ],
  }
];