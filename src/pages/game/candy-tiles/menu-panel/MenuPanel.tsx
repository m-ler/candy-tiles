import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../hooks/useUnmountAnimation';
import MenuIconButton from '../../../../mui/components/MenuIconButton';
import { FaHome } from 'react-icons/fa';

const MenuPanel = () => {
	const navigate = useNavigate();
	const unmountAnimation = useUnmountAnimation('#game-container');

	const homeOnClick = () => unmountAnimation(() => navigate('/'));

	return (
		<div className='bg-black/25 p-[16px] rounded-[5px]'>
			<Tooltip title='Go back'>
				<div>
					<MenuIconButton onClick={homeOnClick}>
						<FaHome></FaHome>
					</MenuIconButton>
				</div>
			</Tooltip>
		</div>
	);
};

export default MenuPanel;
