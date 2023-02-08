import { FaHome } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAudio from '../../../../hooks/useAudio';
import useReloadPage from '../../../../hooks/useReloadPage';
import useUnmountAnimation from '../../../../hooks/useUnmountAnimation';
import MenuIconButtonSecondary from '../../../../mui/components/MenuIconButtonSecondary';
import Tooltip from '../../../../mui/components/Tooltip';
import useDialogUnmountAnimation from './hooks/useDialogUnmountAnimation';

type Props = {
	dialogID: string;
};
const GameOverActions = ({ dialogID }: Props) => {
	const navigate = useNavigate();
	const reloadPage = useReloadPage();
	const animateGameUnmount = useUnmountAnimation('#game-container');
	const animateDialogUnmount = useDialogUnmountAnimation(`#${dialogID}`);
	const playAudio = useAudio();

	const goBackOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		animateDialogUnmount({
			duration: 300,
			complete: () => animateGameUnmount(() => navigate('/')),
		});
	};

	const tryAgainOnClick = () => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		animateDialogUnmount({
			duration: 300,
			complete: () => animateGameUnmount(reloadPage),
		});
	};

	return (
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
	);
};

export default GameOverActions;
