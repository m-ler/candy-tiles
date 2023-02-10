import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import Toast from './components/Toast';
import UserInteractionDetection from './components/UserInteractionDetection';
import { muiTheme } from './mui/theme';
import GamePage from './pages/game';
import LevelCreatorPage from './pages/level-creator';
import LevelSelectorPage from './pages/level-selector';

const queryClient = new QueryClient();

const App = () => {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<UserInteractionDetection></UserInteractionDetection>
				<ThemeProvider theme={muiTheme}>
					<Header></Header>
					<div className="flex flex-col p-[16px] md:p-[12px] grow overflow-hidden">
						<Routes>
							<Route path="/" element={<LevelSelectorPage></LevelSelectorPage>}></Route>
							<Route path="/level/:levelId" element={<GamePage></GamePage>}></Route>
							<Route path="/level-creator" element={<LevelCreatorPage></LevelCreatorPage>}></Route>
						</Routes>
					</div>
					<Toast></Toast>
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
