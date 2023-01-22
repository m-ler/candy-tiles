import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../hooks/useUnmountAnimation';
import MenuIconButton from '../../../../mui/components/MenuIconButton';
import { FaHome } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import useReloadPage from '../../../../hooks/useReloadPage';

const MenuPanel = () => {
	const navigate = useNavigate();
	const unmountAnimation = useUnmountAnimation('#game-container');
	const reloadPage = useReloadPage();

	const homeOnClick = () => unmountAnimation(() => navigate('/'));
	const resetLevelOnClick = () => unmountAnimation(() => reloadPage());

	return (
		<div className="bg-black/25 p-[16px] rounded-[5px] flex gap-[10px]">
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
		</div>
	);
};

export default MenuPanel;