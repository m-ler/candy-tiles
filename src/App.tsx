import { ThemeProvider } from '@emotion/react';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import UserInteractionDetection from './components/UserInteractionDetection';
import { muiTheme } from './mui/theme';
import GamePage from './pages/game';

const App = () => {
	return (
		<RecoilRoot>
			<UserInteractionDetection></UserInteractionDetection>
			<ThemeProvider theme={muiTheme}>
				<main className='flex min-h-screen'>
					<Routes>
						<Route path='/' element={<GamePage></GamePage>}></Route>
					</Routes>
				</main>
			</ThemeProvider>
		</RecoilRoot>
	);
};

export default App;
