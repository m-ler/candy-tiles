import { levelEditorTitleState } from './levelEditorTitle';
import { selector } from 'recoil';
import { itemListEditorState } from './itemListEditor';
import { levelRulesState } from './levelRules';
import { slotListEditorState } from './slotListEditor';
import { tileListEditorState } from './tileListEditor';

export const levelDataEditorState = selector<LevelDataEditor>({
	key: 'levelDataEditor',
	get: ({ get }) => {
		const slotList = get(slotListEditorState);
		const tileList = get(tileListEditorState);
		const itemList = get(itemListEditorState);
		const levelRules = get(levelRulesState);
		const levelTitle = get(levelEditorTitleState);

		return {
			slotList,
			tileList,
			itemList,
			levelRules,
			levelTitle
		};
	},
});
