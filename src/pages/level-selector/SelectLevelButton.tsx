import { Button, ButtonProps } from '@mui/material';
import { muiPalette } from '../../mui/theme';
import { useNavigate } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';
import { AiFillStar } from 'react-icons/ai';
import useUnmountAnimation from '../../hooks/useUnmountAnimation';
import { MdLock } from 'react-icons/md';

const getStarIcon = (lit: boolean): JSX.Element => (
	<AiFillStar size={'16px'} style={{ color: lit ? '#ffd14f' : 'rgba(0,0,0,0.25)' }}></AiFillStar>
);

type Props = ButtonProps & {
	locked: boolean;
	stars: number;
	levelId: number;
};

const SelectLevelButton = (props: Props): JSX.Element => {
	const navigate = useNavigate();
	const playAudio = useAudio();
	const unmountAnimation = useUnmountAnimation('#level-selector-container');

	const handleClick = (): void => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		unmountAnimation(() => navigate(`/level/${props.levelId}`));
	};

	return (
		<Button
			className="translate-x-[-5000px] flex flex-col relative"
			data-level-button
			disabled={props.locked}
			onClick={handleClick}
			sx={{
				width: '100%',
				minWidth: 20,
				backgroundColor: muiPalette.secondary.main,
				fontSize: 20,
				color: 'white',
				fontWeight: 'bold',
				fontFamily: 'YellowCandy',
				'&:hover': {
					backgroundColor: muiPalette.tertiary.dark,
				},
				'&:disabled': {
					opacity: 0.5,
					color: 'white',
				},
			}}
		>
			{props.locked ? <MdLock className="m-[4px]"></MdLock> : props.levelId}
			<div className="flex">
				{getStarIcon(props.stars >= 1)}
				{getStarIcon(props.stars >= 2)}
				{getStarIcon(props.stars >= 3)}
			</div>
		</Button>
	);
};

export default SelectLevelButton;
function unmountAnimation(arg0: () => any) {
	throw new Error('Function not implemented.');
}
