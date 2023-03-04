import { Button, Tab, Tabs } from '@mui/material';
import anime from 'animejs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMountAnimation from '../../hooks/useMountAnimation';
import useUnmountAnimation from '../../hooks/useUnmountAnimation';
import SelectLevelButton from './SelectLevelButton';
import TabPanel from '../../mui/components/TabPanel';
import { useRecoilValue } from 'recoil';
import { completedLevelsState } from '../../store/completedLevels';
import Header from '../../components/header';

const animateButtons = () => {
	anime({
		targets: '[data-level-button]',
		scale: [0, 1],
		delay: anime.stagger(4),
		duration: 500,
		easing: 'easeOutCirc',
	});
};

const LevelSelectorPage = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const navigate = useNavigate();
	useMountAnimation('#level-selector-container');
	const unmountAnimation = useUnmountAnimation('#level-selector-container');
	const completedLevels = useRecoilValue(completedLevelsState);

	useEffect(() => {
		selectedTab === 0 && animateButtons();
	}, [selectedTab]);

	const onCreateClick = () => {
		unmountAnimation(() => navigate('/level-creator'));
	};

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTab(newValue);
	};

	return (
		<>
			<Header />
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
						{new Array(50).fill(0).map((x, index) => {
							const levelAvaliable = index === 0 || completedLevels.main.some((x) => x.id === index);
							const stars = completedLevels.main.find((x) => x.id === index + 1)?.stars || 0;
							return <SelectLevelButton key={index} locked={!levelAvaliable} stars={stars} levelId={index + 1} />;
						})}
					</div>
				</TabPanel>

				<TabPanel className="bg-black/20 px-[16px] py-[8px]" index={1} value={selectedTab}>
					<Button variant="contained" sx={{ fontWeight: 'bolder', marginLeft: 'auto' }} disableElevation onClick={onCreateClick}>
						Create
					</Button>
				</TabPanel>
			</div>
		</>
	);
};

export default LevelSelectorPage;
