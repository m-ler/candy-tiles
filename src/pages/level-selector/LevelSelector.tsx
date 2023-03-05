import { Container, Grid, Paper, Stack, Tab, Tabs } from '@mui/material';
import anime from 'animejs';
import { useEffect, useState } from 'react';
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
	const completedLevels = useRecoilValue(completedLevelsState);

	useEffect(() => {
		selectedTab === 0 && animateButtons();
	}, [selectedTab]);

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTab(newValue);
	};

	return (
		<>
			<Header />
			<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
				<Stack component={Paper} overflow="hidden">
					<Tabs
						value={selectedTab}
						onChange={onTabChange}
						centered
						variant="fullWidth"
						sx={{ minHeight: '64px' }}
						className="px-[16px] py-[8px] sticky top-0 left-0"
						textColor="primary"
						indicatorColor="primary"
					>
						<Tab label="Main Levels"></Tab>
						<Tab label="Online levels"></Tab>
						<Tab label="My levels"></Tab>
					</Tabs>
					<TabPanel className="overflow-auto" index={0} value={selectedTab}>
						<Grid container columns={{ xs: 2, sm: 4, md: 8 }} spacing={2} padding={2}>
							{new Array(50).fill(0).map((x, index) => {
								const levelAvaliable = index === 0 || completedLevels.main.some((x) => x.id === index);
								const stars = completedLevels.main.find((x) => x.id === index + 1)?.stars || 0;
								return (
									<Grid item xs={1} key={index}>
										<SelectLevelButton locked={!levelAvaliable} stars={stars} levelId={index + 1} />{' '}
									</Grid>
								);
							})}
						</Grid>
					</TabPanel>

					<TabPanel className="bg-black/20 px-[16px] py-[8px]" index={1} value={selectedTab}></TabPanel>
				</Stack>
			</Container>
		</>
	);
};

export default LevelSelectorPage;
