import { Routes, Route } from 'react-router-dom';
import GamePage from './assets/pages/game';

export default () => {
	return (
		<main className="">
			<Routes>
				<Route path="/" element={<GamePage></GamePage>}></Route>
			</Routes>
		</main>
	);
};
