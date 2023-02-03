import { IconButton, Tooltip } from '@mui/material';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import useMountAnimation from '../../hooks/useMountAnimation';
import GridEditor from './grid-editor';
import LevelElementsPanel from './level-elements-panel';
import LevelForm from './LevelForm.';
import LevelEditorCursor from './LevelEditorCursor';
import MouseButtonsIndicators from './MouseButtonsIndicators';
import SaveLevelButton from './save-level-button';

const LevelCreatorPage = () => {
	useMountAnimation('#level-creator-container');

	return (
		<>
			<section
				className="h-[min(800px,100%)] max-h-[1000px] flex flex-col bg-s-dark rounded w-[min(11s00px,100%)] mx-auto max-w-full mb-[24px] overflow-hidden"
				id="level-creator-container"
				onContextMenu={(e) => e.preventDefault()}
			>
				<div className="flex p-[12px] bg-black/20 border-b border-white/25">
					<Tooltip title="Cancel">
						<IconButton>
							<MdClose className="text-p-main"></MdClose>
						</IconButton>
					</Tooltip>

					<SaveLevelButton></SaveLevelButton>
				</div>

				<div className="flex flex-col grow gap-[16px] p-[12px] overflow-hidden max-w-full bg-black/20">
					<div className="flex flex-col overflow-hidden gap-[12px]">
						<LevelForm></LevelForm>
						<LevelElementsPanel></LevelElementsPanel>
					</div>

					<GridEditor></GridEditor>
				</div>
			</section>
			<MouseButtonsIndicators></MouseButtonsIndicators>
			{createPortal(<LevelEditorCursor></LevelEditorCursor>, document.body)}
		</>
	);
};

export default LevelCreatorPage;
