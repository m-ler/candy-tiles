import anime from 'animejs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';
import useMountAnimation from '../../hooks/useMountAnimation';
import useUnmountAnimation from '../../hooks/useUnmountAnimation';
import SelectLevelButton from '../../mui/components/SelectLevelButton';

const animateButtons = () => {
	anime({
		targets: '[data-level-button]',
		opacity: [0, 1],
		translateY: [100, 0],
		delay: anime.stagger(25),
		duration: 600,
	});
};

const LevelSelectorPage = () => {
	const navigate = useNavigate();
	const playAudio = useAudio();
	useMountAnimation('#level-selector-container');
	const unmountAnimation = useUnmountAnimation('#level-selector-container');

	useEffect(() => {
		animateButtons();
	}, []);

	const selectLevel = (levelID: number): void => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		unmountAnimation(() => navigate(`/level/${levelID}`));
	};

	return (
		<div className="flex flex-col bg-s-main rounded-lg overflow-auto w-[min(800px,100%)] m-auto p-[16px]" id="level-selector-container">
			<h3 className="font-YellowCandy text-center w-full text-[24px] text-white mb-[16px]">Select level</h3>
			<div
				className="grid gap-[15px] items-center overflow-hidden"
				style={{ gridTemplateColumns: 'repeat( auto-fill, minmax(50px,1fr) )' }}
			>
				{new Array(30).fill(0).map((x, index) => (
					<SelectLevelButton className="translate-x-[-5000px]" data-level-button key={index} onClick={() => selectLevel(index + 1)}>
						{index + 1}
					</SelectLevelButton>
				))}
			</div>
		</div>
	);
};

export default LevelSelectorPage;
