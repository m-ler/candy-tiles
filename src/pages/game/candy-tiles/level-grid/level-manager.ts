import { checkForMatchings } from "../../../../utils/tile-matching";

class LevelManager {

  private itemsChangeSubscribers: ((matchList: LevelItem[], matched: boolean) => void)[] = [];

  private _levelData: LevelRuntimeData = {
    items: [],
    tiles: [],
    prevItems: [],
    matchList: [],
    matched: false
  };

  get levelData(): Readonly<LevelRuntimeData> {
    return this._levelData;
  };

  subscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers.push(callback);
  unsubscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers = this.itemsChangeSubscribers.filter(x => x !== callback);
  notifyItemsChange = () => this.itemsChangeSubscribers.forEach(callback => callback(this._levelData.items, this._levelData.matched));

  setItems = (items: LevelItem[], notify: boolean) => {
    this._levelData.items = items;
    notify && this.notifyItemsChange();
  };

  setTiles = (tiles: LevelTile[], notify: boolean) => {
    this._levelData.tiles = tiles;
  };

  checkMatchings = () => {
    const matchResult = checkForMatchings(this._levelData.items);
    this._levelData.matched = matchResult.thereWereMatches;
    matchResult.matchingList.forEach(match => {
      if (match.matched) this._levelData.items[match.index] = null;
    });

    this.notifyItemsChange();
    setTimeout(() => {
      console.log("persona");
    }, 500);
  };

};

export default new LevelManager();