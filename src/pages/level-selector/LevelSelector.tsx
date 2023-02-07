import { Button, Tab, Tabs } from '@mui/material';
import anime from 'animejs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';
import useMountAnimation from '../../hooks/useMountAnimation';
import useUnmountAnimation from '../../hooks/useUnmountAnimation';
import SelectLevelButton from '../../mui/components/SelectLevelButton';
import TabPanel from '../../mui/components/TabPanel';
import { AiFillStar } from 'react-icons/ai';

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
	const [selectedTab, setSelectedTab] = useState(0);
	const navigate = useNavigate();
	const playAudio = useAudio();
	useMountAnimation('#level-selector-container');
	const unmountAnimation = useUnmountAnimation('#level-selector-container');

	useEffect(() => {
		selectedTab === 0 && animateButtons();
	}, [selectedTab]);

	const selectLevel = (levelID: number): void => {
		playAudio({ audioName: 'buttonClick1', volume: 0.5 });
		unmountAnimation(() => navigate(`/level/${levelID}`));
	};

	const onCreateClick = () => {
		unmountAnimation(() => navigate('/level-creator'));
	};

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTab(newValue);
	};

	return (
		<div className="flex flex-col bg-s-dark rounded-lg overflow-hidden w-[min(800px,100%)] m-auto" id="level-selector-container">
			<Tabs
				value={selectedTab}
				onChange={onTabChange}
				centered
				variant="fullWidth"
				sx={{ minHeight: '64px' }}
				className="bg-black/20 px-[16px] py-[8px] sticky top-0 left-0"
				textColor="primary"
				indicatorColor="primary"
			>
				<Tab label="Levels"></Tab>
				<Tab label="Online levels"></Tab>
			</Tabs>
			<TabPanel className="bg-black/20 px-[16px] py-[8px] overflow-auto" index={0} value={selectedTab}>
				<div className="grid gap-[15px] items-center pb-[12px]" style={{ gridTemplateColumns: 'repeat( auto-fill, minmax(100px,1fr) )' }}>
					{new Array(50).fill(0).map((x, index) => (
						<SelectLevelButton
							className="translate-x-[-5000px] flex flex-col"
							data-level-button
							key={index}
							onClick={() => selectLevel(index + 1)}
						>
							{index + 1}
							<div className="flex">
								<AiFillStar className="text-black/25" size={'16px'}></AiFillStar>
								<AiFillStar className="text-black/25" size={'16px'}></AiFillStar>
								<AiFillStar className="text-black/25" size={'16px'}></AiFillStar>
							</div>
						</SelectLevelButton>
					))}
				</div>
			</TabPanel>

			<TabPanel className="bg-black/20 px-[16px] py-[8px]" index={1} value={selectedTab}>
				<Button variant="contained" sx={{ fontWeight: 'bolder', marginLeft: 'auto' }} disableElevation onClick={onCreateClick}>
					Create
				</Button>
			</TabPanel>
		</div>
	);
};

export default LevelSelectorPage;
