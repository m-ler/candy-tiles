import { ThemeProvider } from '@emotion/react';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import UserInteractionDetection from './components/UserInteractionDetection';
import { muiTheme } from './mui/theme';
import GamePage from './pages/game';
import LevelSelectorPage from './pages/level-selector';

const App = () => {
	return (
		<RecoilRoot>
			<UserInteractionDetection></UserInteractionDetection>
			<ThemeProvider theme={muiTheme}>
				<Header></Header>
				<div className='flex flex-col p-[16px] grow'>
					<Routes>
						<Route path='/' element={<LevelSelectorPage></LevelSelectorPage>}></Route>
						<Route path='/level/:id' element={<GamePage></GamePage>}></Route>
					</Routes>
				</div>
			</ThemeProvider>
		</RecoilRoot>
	);
};

export default App;
