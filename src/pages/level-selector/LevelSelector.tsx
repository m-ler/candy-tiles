import { Box, Container, Paper, Stack, Tab, Tabs } from '@mui/material';
import anime from 'animejs';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Header from '../../components/header';
import MainLevelsTab from './main-levels-tab';
import OnlineLevelsTab from './online-levels-tab';
import { grey } from '@mui/material/colors';
import { selectedTabState } from './store/selectedTab';
import SwipeableViews from 'react-swipeable-views';
import MyLevelsTab from './my-levels-tab';
import { supabase } from '../../config/supabase-config';
import useLoggedUser from '../../hooks/useLoggedUser';

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
	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
	const loggedUser = useLoggedUser();

	useEffect(() => {
		selectedTab === 0 && animateButtons();

		supabase.auth.onAuthStateChange((event) => {
			event === 'SIGNED_OUT' && selectedTab === 2 && setSelectedTab(1);
		});
	}, [selectedTab]);

	const onTabChange = (e: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);
	const onSwipeableChange = (index: number) => setSelectedTab(index);

	return (
		<>
			<Header />
			<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
				<Stack component={Paper} overflow="hidden" sx={{ backgroundColor: grey[100] }}>
					<Tabs
						value={selectedTab}
						onChange={onTabChange}
						centered
						variant="fullWidth"
						sx={{ minHeight: '64px' }}
						className="px-[16px] py-[8px] sticky top-0 left-0"
						textColor="primary"
						indicatorColor="primary"
						style={{ flexShrink: 0 }}
					>
						<Tab label="Main Levels" data-cy="main-levels-tab-button"></Tab>
						<Tab label="Online levels" data-cy="online-levels-tab-button"></Tab>
						{!!loggedUser && <Tab label="My levels"></Tab>}
					</Tabs>
					<SwipeableViews
						index={selectedTab}
						onChangeIndex={onSwipeableChange}
						containerStyle={{
							transition: '0.35s ',
						}}
					>
						<Box className="overflow-hidden" display={selectedTab === 0 ? 'block' : 'none'}>
							<MainLevelsTab />
						</Box>

						<Box className="overflow-hidden" display={selectedTab === 1 ? 'block' : 'none'}>
							<OnlineLevelsTab />
						</Box>

						<Box className="overflow-hidden" display={selectedTab === 2 ? 'block' : 'none'}>
							<MyLevelsTab />
						</Box>
					</SwipeableViews>
				</Stack>
			</Container>
		</>
	);
};

export default LevelSelectorPage;
