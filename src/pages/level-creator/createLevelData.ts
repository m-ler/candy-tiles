import { LevelFile } from '../../types';
import { LevelItem, LevelTile } from '../game/candy-tiles/types';
import { LevelDataEditor } from './types';

export default ({ levelRules, itemList, slotList, tileList, levelTitle }: LevelDataEditor): LevelFile => ({
	id: 0,
	maximumMoves: levelRules.maximumMoves,
	score: levelRules.targetScore,
	initialItems: itemList.map((x) => (x?.elementObj ? (x.elementObj as LevelItem) : null)),
	initialTiles: tileList.map((x, i) => {
		const slotAvaliable = slotList[i];
		const tile: LevelTile = x?.elementObj ? (x.elementObj as LevelTile) : { type: 'Normal' };
		return slotAvaliable ? tile : null;
	}),
	tasks: levelRules.tasks,
	title: levelTitle,
});
