import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemListEditorState } from './store/itemListEditor';
import { levelDataEditorState } from './store/levelDataEditor';
import { levelEditorTitleState } from './store/levelEditorTitle';
import { levelRulesState } from './store/levelRules';
import { slotListEditorState } from './store/slotListEditor';
import { tileListEditorState } from './store/tileListEditor';

const LOCAL_STORAGE_LEVEL_EDITOR = 'level-editor-data';

const LevelCreatorStateManager = () => {
	const setLevelRules = useSetRecoilState(levelRulesState);
	const setSlotListEditor = useSetRecoilState(slotListEditorState);
	const setTileListEditor = useSetRecoilState(tileListEditorState);
	const setItemListEditor = useSetRecoilState(itemListEditorState);
	const setLevelEditorTitle = useSetRecoilState(levelEditorTitleState);
	const levelDataEditor = useRecoilValue(levelDataEditorState);

	const loadFromLocalStorage = () => {
		const savedLevelEditorState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LEVEL_EDITOR) || '{}') as LevelDataEditor;
		setLevelRules((state) => ({
			maximumMoves: savedLevelEditorState.levelRules?.maximumMoves || state.maximumMoves,
			targetScore: savedLevelEditorState.levelRules?.targetScore || state.targetScore,
			tasks: savedLevelEditorState.levelRules?.tasks || state.tasks,
		}));

		setSlotListEditor((state) => savedLevelEditorState?.slotList || state);
		setTileListEditor((state) => savedLevelEditorState?.tileList || state);
		setItemListEditor((state) => savedLevelEditorState?.itemList || state);
		setLevelEditorTitle((state) => savedLevelEditorState.levelTitle || state);
	};

	const saveLevelDataToLocalStorage = () => localStorage.setItem(LOCAL_STORAGE_LEVEL_EDITOR, JSON.stringify(levelDataEditor));

	useEffect(() => {
		loadFromLocalStorage();
	}, []);

	useEffect(() => {
		saveLevelDataToLocalStorage();
	}, [levelDataEditor]);

	return <></>;
};

export default LevelCreatorStateManager;
