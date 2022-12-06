import { delay } from "../../../../utils/delay";
import { checkForMatchings, generateNewCandies, tryGetLevelItemByFusion, NewItemPosition, repositionItems } from "../../../../utils/tile-matching";
import matchSFX from './../../../../assets/audio/match.mp3';
import fusionMatchSFX from './../../../../assets/audio/fusionMatch.mp3';

class LevelManager {

  private itemsChangeSubscribers: ((matchList: LevelItem[], matched: boolean) => void)[] = [];
  private comboStartSubscribers: (() => void)[] = [];
  private comboEndStartSubscribers: (() => void)[] = [];
  private itemsRerenderSubscribers: ((items: LevelItem[]) => void)[] = [];

  private _levelData: LevelRuntimeData = {
    items: [],
    tiles: [],
    prevItems: [],
    matchResult: { matchingList: [], thereWereMatches: false },
    actionsLocked: false,
    comboCount: 1,
    swappedItems: [null, null]
  };

  private matchSound = new Audio(matchSFX);
  private fusionMatchSound = new Audio(fusionMatchSFX);

  get levelData(): Readonly<LevelRuntimeData> {
    return this._levelData;
  };

  constructor() {
    this.matchSound.volume = 0.4;
    this.matchSound.preservesPitch = false;

    this.subscribeComboStart(this.onComboStart);
    this.subscribeComboEnd(this.onComboEnd);
  };

  subscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers.push(callback);
  unsubscribeItemsChange = (callback: (items: LevelItem[], matched: boolean) => void) => this.itemsChangeSubscribers = this.itemsChangeSubscribers.filter(x => x !== callback);
  notifyItemsChange = () => this.itemsChangeSubscribers.forEach(callback => callback(this._levelData.items, this._levelData.matchResult.thereWereMatches));

  subscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers.push(callback);
  unsubscribeItemsRerender = (callback: (items: LevelItem[]) => void) => this.itemsRerenderSubscribers = this.itemsRerenderSubscribers.filter(x => x !== callback);
  notifyItemsRerender = () => this.itemsRerenderSubscribers.forEach(callback => callback(this._levelData.items));

  subscribeComboStart = (callback: () => void) => this.comboStartSubscribers.push(callback);
  unsubscribeComboStart = (callback: () => void) => this.comboStartSubscribers = this.comboStartSubscribers.filter(x => x !== callback);
  notifyComboStart = () => this.comboStartSubscribers.forEach(callback => callback());

  subscribeComboEnd = (callback: () => void) => this.comboEndStartSubscribers.push(callback);
  unsubscribeComboEnd = (callback: () => void) => this.comboEndStartSubscribers = this.comboEndStartSubscribers.filter(x => x !== callback);
  notifyComboEnd = () => {
    this.comboEndStartSubscribers.forEach(callback => callback());
  };

  setItems = (items: LevelItem[], notify: boolean) => {
    this._levelData.items = items;
    notify && this.notifyItemsChange();
  };

  setTiles = (tiles: LevelTile[], notify: boolean) => {
    this._levelData.tiles = tiles;
  };

  swapItems = async (items: [number, number]) => {
    this._levelData.swappedItems = items;
    this.notifyComboStart();
    this._levelData.actionsLocked = true;
    const firstItem = structuredClone(this._levelData.items[items[0]]);
    this._levelData.items[items[0]] = this._levelData.items[items[1]];
    this._levelData.items[items[1]] = firstItem;

    this._levelData.matchResult.matchingList = [];
    this.notifyItemsChange();

    await delay(300);

    await this.checkMatchings();
    if (!this._levelData.matchResult.thereWereMatches) {
      this._levelData.items[items[1]] = structuredClone(this._levelData.items[items[0]]);
      this._levelData.items[items[0]] = firstItem;
      this.notifyItemsChange();
      return;
    }
  };

  checkMatchings = async () => {
    this._levelData.matchResult = checkForMatchings(this._levelData.items);
    this._levelData.matchResult.matchingList.filter(x => x.matched).forEach(match => {
      const itemWasSwapped = this._levelData.swappedItems.includes(match.index);
      const fusionItem = tryGetLevelItemByFusion(match, this._levelData.items[match.index]);
      this._levelData.items[match.index] = itemWasSwapped ? fusionItem : null;
      fusionItem && itemWasSwapped && this.fusionMatchSound.play();
    });

    this._levelData.swappedItems = [null, null];

    if (this._levelData.matchResult.thereWereMatches) {
      this._levelData.comboCount += 1;
      this.playMatchSFX();
      this.notifyItemsChange();
      await delay(300);
      this.notifyItemsRerender();
      await delay(300)
      this.updateItemsPositions();
      await delay(300);
      this.fillEmptyTiles();
      return;
    }

    this.notifyComboEnd();
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

  private playMatchSFX = () => {
    this.matchSound.play();
    this.matchSound.playbackRate < 2 && (this.matchSound.playbackRate *= 1.1);
  };

  private onComboStart = () => {
  };

  private onComboEnd = () => {
    this.matchSound.playbackRate = 1;
    this._levelData.comboCount = 1;
  };

};

export default new LevelManager();