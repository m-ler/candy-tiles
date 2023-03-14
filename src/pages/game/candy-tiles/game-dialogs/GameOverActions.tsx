import { Tooltip } from '@mui/material';
import { FaHome } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAudio from '../../../../hooks/useAudio';
import useReloadPage from '../../../../hooks/useReloadPage';
import MenuIconButtonSecondary from '../MenuIconButtonSecondary';
import RateLevelButtons from './RateLevelButtons';

const GameOverActions = () => {
	const navigate = useNavigate();
	const reloadPage = useReloadPage();
	const playAudio = useAudio();

	const goBackOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		navigate('/levels');
	};

	const tryAgainOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		reloadPage();
	};

	return (
		<>
			<RateLevelButtons />
			<div className="flex gap-[12px]">
				<Tooltip title="Go back">
					<div>
						<MenuIconButtonSecondary color="secondary" onClick={goBackOnClick}>
							<FaHome className=""></FaHome>
						</MenuIconButtonSecondary>
					</div>
				</Tooltip>
				<Tooltip title="Try again">
					<div>
						<MenuIconButtonSecondary color="secondary" onClick={tryAgainOnClick}>
							<MdReplay></MdReplay>
						</MenuIconButtonSecondary>
					</div>
				</Tooltip>
			</div>
		</>
	);
};

export default GameOverActions;
