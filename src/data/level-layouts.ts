type LevelLayout = {
  items: Candy[],
  tiles: (Tile | null)[]
};

export const levelList: LevelLayout[] = [
  {
    items: [
      { color: "Blue" }, { color: "Blue" }, { color: "Orange" }, { color: "Orange" }, { color: "Red" }, { color: "Yellow" }, { color: "Green" }, { color: "Purple" }, { color: "Green" },
      { color: "Green" }, { color: "Green" }, { color: "Blue" }, { color: "Blue" }, { color: "Purple" }, { color: "Orange" }, { color: "Green" }, { color: "Purple" }, { color: "Orange" },
      { color: "Orange" }, { color: "Green" }, { color: "Red" }, { color: "Purple" }, { color: "Red" }, { color: "Yellow" }, { color: "Blue" }, { color: "Orange" }, { color: "Purple" },
      { color: "Purple" }, { color: "Yellow" }, { color: "Yellow" }, { color: "Blue" }, { color: "Purple" }, { color: "Orange" }, { color: "Green" }, { color: "Purple" }, { color: "Purple" },
      { color: "Red" }, { color: "Orange" }, { color: "Red" }, { color: "Orange" }, { color: "Red" }, { color: "Blue" }, { color: "Purple" }, { color: "Purple" }, { color: "Orange" },
      { color: "Green" }, { color: "Red" }, { color: "Blue" }, { color: "Purple" }, { color: "Purple" }, { color: "Blue" }, { color: "Green" }, { color: "Orange" }, { color: "Green" },
      { color: "Yellow" }, { color: "Red" }, { color: "Red" }, { color: "Blue" }, { color: "Red" }, { color: "Orange" }, { color: "Purple" }, { color: "Purple" }, { color: "Green" },
      { color: "Purple" }, { color: "Orange" }, { color: "Yellow" }, { color: "Purple" }, { color: "Red" }, { color: "Yellow" }, { color: "Green" }, { color: "Green" }, { color: "Orange" },
      { color: "Blue" }, { color: "Orange" }, { color: "Yellow" }, { color: "Yellow" }, { color: "Blue" }, { color: "Purple" }, { color: "Green" }, { color: "Orange" }, { color: "Purple" },
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