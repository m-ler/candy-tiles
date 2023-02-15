import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../hooks/useUnmountAnimation';
import MenuIconButton from '../../../../mui/components/MenuIconButton';
import { FaHome } from 'react-icons/fa';
import { MdReplay, MdVolumeUp } from 'react-icons/md';
import useReloadPage from '../../../../hooks/useReloadPage';
import useAudio from '../../../../hooks/useAudio';
import Tooltip from '../../../../mui/components/Tooltip';
import useSelectedLevel from '../../../../hooks/useSelectedLevel';
import { useSetRecoilState } from 'recoil';
import { showVolumeDialogState } from './../../store/showVolumeDialog';

const Menu = () => {
	const selectedLevel = useSelectedLevel().data;
	const navigate = useNavigate();
	const unmountAnimation = useUnmountAnimation('#game-container');
	const reloadPage = useReloadPage();
	const playAudio = useAudio();
	const setShowVolumeDialog = useSetRecoilState(showVolumeDialogState);

	const homeOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		unmountAnimation(() => navigate('/'));
	};

	const resetLevelOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		unmountAnimation(() => reloadPage());
	};

	const volumeOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		setShowVolumeDialog(true);
	};

	return (
		<div className="bg-black/25 p-[16px] md:p-[12px] rounded-[5px] flex flex-col gap-y-[10px] md:w-min md:mx-auto">
			<span className="font-YellowCandy text-[14px] text-p-main text-center border-b border-p-main pb-[5px]">
				Level #{selectedLevel?.id}
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
