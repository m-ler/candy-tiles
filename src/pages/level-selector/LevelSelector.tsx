import anime from 'animejs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectLevelButton from '../../mui/components/SelectLevelButton';

const animateMount = () => {
	anime({
		targets: '#level-selector-container',
		opacity: [0, 1],
		translateY: [500, 0],
		easing: 'easeOutBack',
		duration: 300,
		endDelay: 200,
	});
};

const animateButtons = () => {
	anime({
		targets: '[data-level-button]',
		opacity: [0, 1],
		translateY: [100, 0],
		delay: anime.stagger(25),
		duration: 600,
	});
};

const animateUnMount = (onComplete: () => void) => {
	anime({
		targets: '#level-selector-container',
		opacity: [1, 0],
		translateY: [0, 500],
		easing: 'easeInBack',
		duration: 300,
		endDelay: 200,
		complete: onComplete,
	});
};

const LevelSelectorPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		animateMount();
		animateButtons();
	}, []);

	const selectLevel = (levelID: number): void => {
		animateUnMount(() => navigate(`/level/${levelID}`));
	};

	return (
		<div className='flex flex-col bg-s-main rounded-lg overflow-auto w-[min(800px,100%)] m-auto p-[16px]' id='level-selector-container'>
			<h3 className='font-YellowCandy text-center w-full text-[24px] text-white mb-[16px]'>Select level</h3>
			<div
				className='grid gap-[15px] items-center overflow-hidden'
				style={{ gridTemplateColumns: 'repeat( auto-fill, minmax(50px,1fr) )' }}
			>
				{new Array(30).fill(0).map((x, index) => (
					<SelectLevelButton className='translate-x-[-5000px]' data-level-button key={index} onClick={() => selectLevel(index + 1)}>
						{index + 1}
					</SelectLevelButton>
				))}
			</div>
		</div>
	);
};

export default LevelSelectorPage;
