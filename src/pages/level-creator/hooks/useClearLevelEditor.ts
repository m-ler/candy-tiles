import { useResetRecoilState } from 'recoil';
import { itemListEditorState } from '../store/itemListEditor';
import { levelEditorTitleState } from '../store/levelEditorTitle';
import { levelRulesState } from '../store/levelRules';
import { selectedElementState } from '../store/selectedElement';
import { slotListEditorState } from '../store/slotListEditor';
import { tileListEditorState } from '../store/tileListEditor';

export default () => {
	const resetSlotList = useResetRecoilState(slotListEditorState);
	const resetTileList = useResetRecoilState(tileListEditorState);
	const resetItemList = useResetRecoilState(itemListEditorState);
	const resetLevelDataEditor = useResetRecoilState(levelRulesState);
	const resetSelectedElement = useResetRecoilState(selectedElementState);
	const resetLevelEditorTitle = useResetRecoilState(levelEditorTitleState);

	const resetLevelStateToDefault = () => {
		resetSlotList();
		resetTileList();
		resetItemList();
		resetLevelDataEditor();
		resetSelectedElement();
		resetLevelEditorTitle();
	};

	return resetLevelStateToDefault;
};
