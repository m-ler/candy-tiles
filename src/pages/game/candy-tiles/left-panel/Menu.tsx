import { useNavigate } from 'react-router-dom';
import MenuIconButton from '../MenuIconButton';
import { FaHome } from 'react-icons/fa';
import { MdReplay, MdVolumeUp } from 'react-icons/md';
import useReloadPage from '../../../../hooks/useReloadPage';
import useAudio from '../../../../hooks/useAudio';
import useSelectedLevel from '../../../../hooks/useSelectedLevel';
import { useSetRecoilState } from 'recoil';
import { showVolumeDialogState } from './../../store/showVolumeDialog';
import { Tooltip } from '@mui/material';

const Menu = () => {
	const selectedLevel = useSelectedLevel().data;
	const navigate = useNavigate();
	const reloadPage = useReloadPage();
	const playAudio = useAudio();
	const setShowVolumeDialog = useSetRecoilState(showVolumeDialogState);

	const homeOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		navigate('/levels');
	};

	const resetLevelOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		reloadPage();
	};

	const volumeOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		setShowVolumeDialog(true);
	};

	return (
		<div className="bg-black/25 p-[16px] md:p-[12px] rounded-[5px] flex flex-col gap-y-[10px] md:w-min md:mx-auto">
			<span className="font-YellowCandy text-[16px] text-p-main text-center border-b border-p-main pb-[5px]">
				{selectedLevel?.isMainLevel ? <span>Level #{selectedLevel?.file.id}</span> : <span>{selectedLevel?.title}</span>}
			</span>
			<div className="flex justify-between gap-[10px]">
				<Tooltip title="Go back">
					<div>
						<MenuIconButton onClick={homeOnClick}>
							<FaHome></FaHome>
						</MenuIconButton>
					</div>
				</Tooltip>

				<Tooltip title="Reset level">
					<div>
						<MenuIconButton onClick={resetLevelOnClick}>
							<MdReplay></MdReplay>
						</MenuIconButton>
					</div>
				</Tooltip>

				<Tooltip title="Adjust volume">
					<div>
						<MenuIconButton onClick={volumeOnClick}>
							<MdVolumeUp></MdVolumeUp>
						</MenuIconButton>
					</div>
				</Tooltip>
			</div>
		</div>
	);
};

export default Menu;
