import { delay } from "../../../../utils/delay";
import { checkForMatchings, generateNewCandies, NewItemPosition, repositionItems } from "../../../../utils/tile-matching";
import matchSFX from './../../../../assets/audio/match.mp3';

class LevelManager {

  private itemsChangeSubscribers: ((matchList: LevelItem[], matched: boolean) => void)[] = [];
  private sequenceStartSubscribers: (() => void)[] = [];
  private sequenceEndStartSubscribers: (() => void)[] = [];
  private itemsRerenderSubscribers: ((items: LevelItem[]) => void)[] = [];

  private _levelData: LevelRuntimeData = {
    items: [],
    tiles: [],
    prevItems: [],
    matchList: [],
    matched: false,
    actionsLocked: false
  };

  private matchSound = new Audio(matchSFX);

  get levelData(): Readonly<LevelRuntimeData> {
    return this._levelData;
  };

  constructor() {
    this.matchSound.volume = 0.4;
    this.matchSound.preservesPitch = false;
  }

  subscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers.push(callback);
  unsubscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers = this.itemsChangeSubscribers.filter(x => x !== callback);
  notifyItemsChange = () => this.itemsChangeSubscribers.forEach(callback => callback(this._levelData.items, this._levelData.matched));

  subscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers.push(callback);
  unsubscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers = this.itemsRerenderSubscribers.filter(x => x !== callback);
  notifyItemsRerender = () => this.itemsRerenderSubscribers.forEach(callback => callback(this._levelData.items));

  subscribeSequenceStart = (callback: () => void) => this.sequenceStartSubscribers.push(callback);
  unsubscribeSequenceStart = (callback: () => void) => this.sequenceStartSubscribers = this.sequenceStartSubscribers.filter(x => x !== callback);
  notifySequenceStart = () => this.sequenceStartSubscribers.forEach(callback => callback());

  subscribeSequenceEnd = (callback: () => void) => this.sequenceEndStartSubscribers.push(callback);
  unsubscribeSequenceEnd = (callback: () => void) => this.sequenceEndStartSubscribers = this.sequenceEndStartSubscribers.filter(x => x !== callback);
  notifySequenceEnd = () => {
    this.matchSound.playbackRate = 1;
    this.sequenceEndStartSubscribers.forEach(callback => callback());
  };

  setItems = (items: LevelItem[], notify: boolean) => {
    this._levelData.items = items;
    notify && this.notifyItemsChange();
  };

  setTiles = (tiles: LevelTile[], notify: boolean) => {
    this._levelData.tiles = tiles;
  };

  swapItems = async (items: [number, number]) => {
    this.notifySequenceStart();
    this._levelData.actionsLocked = true;
    const firstItem = structuredClone(this._levelData.items[items[0]]);
    this._levelData.items[items[0]] = this._levelData.items[items[1]];
    this._levelData.items[items[1]] = firstItem;

    this._levelData.matchList = [];
    this.notifyItemsChange();

    await delay(300);

    await this.checkMatchings();
    if (!this._levelData.matched) {
      this._levelData.items[items[1]] = structuredClone(this._levelData.items[items[0]]);
      this._levelData.items[items[0]] = firstItem;
      this.notifyItemsChange();
      return;
    }
  };

  checkMatchings = async () => {
    this.notifySequenceStart();
    const matchResult = checkForMatchings(this._levelData.items);
    this._levelData.matched = matchResult.thereWereMatches;
    matchResult.matchingList.filter(x => x.matched).forEach(match => this._levelData.items[match.index] = null);

    if (matchResult.thereWereMatches) {

      this.matchSound.play();
      this.matchSound.playbackRate < 2 && (this.matchSound.playbackRate *= 1.1);
      this.notifyItemsChange();
      await delay(300);
      this.updateItemsPositions();
      await delay(300);
      this.fillEmptyTiles();
      return;
    }

    this.notifySequenceEnd();
  };

  private updateItemsPositions = () => {
    const reposition = repositionItems(this._levelData.items, this._levelData.tiles);
    this._levelData.items = reposition.repositionedItems;
    this.notifyItemsChange();
  };

  private fillEmptyTiles = async () => {
    this._levelData.items = generateNewCandies(this._levelData.items, this._levelData.tiles);
    this.notifyItemsRerender();

    await delay(350);
    this.checkMatchings();
  };

};

export default new LevelManager();