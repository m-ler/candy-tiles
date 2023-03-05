import { Container, IconButton, Stack } from '@mui/material';
import { createPortal } from 'react-dom';
import { MdArrowBack } from 'react-icons/md';
import GridEditor from './grid-editor';
import LevelElementsPanel from './level-elements-panel';
import LevelForm from './LevelForm.';
import LevelEditorCursor from './LevelEditorCursor';
import MouseButtonsIndicators from './MouseButtonsIndicators';
import SaveLevelButton from './save-level-button';
import DownloadLevelButton from './DownloadLevelButton';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../mui/components/Tooltip';
import LevelCreatorStateManager from './LevelCreatorStateManager';
import Header from '../../components/header';
import ClearEditionButton from './ClearEditionButton';
import ClearEditorDialog from './ClearEditorDialog';

const LevelCreatorPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<Header />
			<Container maxWidth="lg" sx={{ flexGrow: 1 }}>
				<Stack
					maxHeight="1000px"
					height="min(800px,100%)"
					marginBottom="1.25rem"
					component={'section'}
					onContextMenu={(e) => e.preventDefault()}
				>
					<div className="flex p-[12px] bg-black/20 border-b border-white/25">
						<Tooltip title="Cancel">
							<IconButton onClick={() => navigate('/')}>
								<MdArrowBack className="text-p-main"></MdArrowBack>
							</IconButton>
						</Tooltip>

						<div className="ml-auto flex gap-x-[12px] items-center">
							<ClearEditionButton />
							<DownloadLevelButton />
							<SaveLevelButton />
						</div>
					</div>

					<div className="flex flex-col grow gap-[16px] p-[12px] overflow-hidden max-w-full bg-black/20">
						<div className="flex flex-col overflow-hidden gap-[12px]">
							<LevelForm></LevelForm>
							<LevelElementsPanel></LevelElementsPanel>
						</div>
						<GridEditor></GridEditor>
					</div>
				</Stack>
			</Container>
			<MouseButtonsIndicators></MouseButtonsIndicators>
			<LevelCreatorStateManager></LevelCreatorStateManager>
			<ClearEditorDialog />
			{createPortal(<LevelEditorCursor></LevelEditorCursor>, document.body)}
		</>
	);
};

export default LevelCreatorPage;
