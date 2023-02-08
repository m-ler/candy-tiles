import { useResetRecoilState } from 'recoil';
import { itemListEditorState } from './store/itemListEditor';
import { slotListEditorState } from './store/slotListEditor';
import { tileListEditorState } from './store/tileListEditor';
import { levelRulesState } from './store/levelRules';
import { useEffect } from 'react';
import { selectedElementState } from './store/selectedElement';

const LevelCreatorStateManager = () => {
	const resetSlotList = useResetRecoilState(slotListEditorState);
	const resetTileList = useResetRecoilState(tileListEditorState);
	const resetItemList = useResetRecoilState(itemListEditorState);
	const resetLevelDataEditor = useResetRecoilState(levelRulesState);
	const resetSelectedElement = useResetRecoilState(selectedElementState);

	useEffect(() => {
		return () => {
			resetLevelStateToDefault();
		};
	}, []);

	const resetLevelStateToDefault = () => {
		resetSlotList();
		resetTileList();
		resetItemList();
		resetLevelDataEditor();
		resetSelectedElement();
	};

	return <></>;
};

export default LevelCreatorStateManager;
