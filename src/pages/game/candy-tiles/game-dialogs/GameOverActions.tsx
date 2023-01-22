import { Tooltip } from '@mui/material';
import anime from 'animejs';
import { FaHome } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useUnmountAnimation from '../../../../hooks/useUnmountAnimation';
import MenuIconButtonSecondary from '../../../../mui/components/MenuIconButtonSecondary';

const animateEnd = (dialogID: string, onComplete?: () => void) => {
	anime({
		targets: `#${dialogID}`,
		translateX: ['0%', '-100%'],
		opacity: 0,
		easing: 'easeInBack',
		duration: 300,
		complete: onComplete,
	});
};

type Props = {
	dialogID: string;
};
const GameOverActions = ({ dialogID }: Props) => {
	const navigate = useNavigate();
	const unmountAnimation = useUnmountAnimation('#game-container');

	const goBackOnClick = () => {
		animateEnd(dialogID, () => unmountAnimation(() => navigate('/')));
	};

	const tryAgainOnClick = () => {
		animateEnd(dialogID, () => unmountAnimation(() => navigate(0)));
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
