import { checkForMatchings, generateNewCandies, NewItemPosition, repositionItems } from "../../../../utils/tile-matching";

class LevelManager {

  private itemsChangeSubscribers: ((matchList: LevelItem[], matched: boolean) => void)[] = [];
  private itemsRepositionSubscribers: ((newPositions: NewItemPosition[]) => void)[] = [];
  private itemsRerenderSubscribers: ((items: LevelItem[]) => void)[] = [];
  private itemsRepositionList: NewItemPosition[] = [];

  private _levelData: LevelRuntimeData = {
    items: [],
    tiles: [],
    prevItems: [],
    matchList: [],
    matched: false,
    actionsLocked: false
  };

  get levelData(): Readonly<LevelRuntimeData> {
    return this._levelData;
  };

  subscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers.push(callback);
  unsubscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers = this.itemsChangeSubscribers.filter(x => x !== callback);
  notifyItemsChange = () => this.itemsChangeSubscribers.forEach(callback => callback(this._levelData.items, this._levelData.matched));

  subscribeItemsReposition = (callback: (newPositions: NewItemPosition[]) => void) => this.itemsRepositionSubscribers.push(callback);
  unsubscribeItemsReposition = (callback: (newPositions: NewItemPosition[]) => void) => this.itemsRepositionSubscribers = this.itemsRepositionSubscribers.filter(x => x !== callback);
  notifyItemsReposion = () => this.itemsRepositionSubscribers.forEach(callback => callback(this.itemsRepositionList));

  subscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers.push(callback);
  unsubscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers = this.itemsRerenderSubscribers.filter(x => x !== callback);
  notifyItemsRerender = () => this.itemsRerenderSubscribers.forEach(callback => callback(this._levelData.items));

  setItems = (items: LevelItem[], notify: boolean) => {
    this._levelData.items = items;
    notify && this.notifyItemsChange();
  };

  setTiles = (tiles: LevelTile[], notify: boolean) => {
    this._levelData.tiles = tiles;
  };

  checkMatchings = () => {
    this._levelData.actionsLocked = true;
    const matchResult = checkForMatchings(this._levelData.items);
    this._levelData.matched = matchResult.thereWereMatches;
    matchResult.matchingList.filter(x => x.matched).forEach(match => this._levelData.items[match.index] = null);

    this.notifyItemsChange();
    if (!matchResult.thereWereMatches) return;
    setTimeout(this.notifyItemsRerender, 200);
    setTimeout(this.updateItemsPositions, 400);
    setTimeout(this.fillEmptyTiles, 600);
  };

  private updateItemsPositions = () => {
    const reposition = repositionItems(this._levelData.items, this._levelData.tiles);
    this._levelData.items = reposition.repositionedItems;
    this.itemsRepositionList = reposition.newPositions;
    this.notifyItemsReposion();
  };

  private fillEmptyTiles = () => {
    this._levelData.items = generateNewCandies(this._levelData.items, this._levelData.tiles);
    this.notifyItemsRerender();
    //setTimeout(this.checkMatchings, 200);
  };

};

export default new LevelManager();