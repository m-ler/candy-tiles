import Dialog from './Dialog';
import { useRecoilState } from 'recoil';
import { showUserAuthDialogState } from '../store/showUserAuthenticationDialog';
import { AppBar, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import SignInForm from './SignInForm';
import { useState } from 'react';
import TabPanel from '../mui/components/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import SignUpForm from './sign-up-form';

const UserAuthDialog = () => {
	const [showUserAuthDialog, setShowUserAuthDialog] = useRecoilState(showUserAuthDialogState);
	const dialogOnClose = () => setShowUserAuthDialog(false);
	const [selectedTab, setSelectedTab] = useState(0);

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);
	const onSwipeableChange = (index: number) => setSelectedTab(index);

	return (
		<Dialog open={showUserAuthDialog} onClose={dialogOnClose} fullWidth={true} maxWidth={'xs'}>
			<DialogContent sx={{ overflow: 'visible' }}>
				<Tabs value={selectedTab} onChange={onTabChange} variant="fullWidth" sx={{ marginBottom: '14px' }}>
					<Tab label="Sign in"></Tab>
					<Tab label="Create account"></Tab>
				</Tabs>

				<SwipeableViews
					index={selectedTab}
					onChangeIndex={onSwipeableChange}
					containerStyle={{
						transition: '0.35s ',
					}}
				>
					<TabPanel value={selectedTab} index={0}>
						<SignInForm onRedirect={dialogOnClose} />
					</TabPanel>
					<TabPanel value={selectedTab} index={1}>
						<SignUpForm onRedirect={dialogOnClose} />
					</TabPanel>
				</SwipeableViews>
			</DialogContent>
		</Dialog>
	);
};

export default UserAuthDialog;
