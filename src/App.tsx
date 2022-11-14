import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game';

export default () => {
	return (
		<main className="flex min-h-screen">
			<Routes>
				<Route path="/" element={<GamePage></GamePage>}></Route>
			</Routes>
		</main>
	);
};
