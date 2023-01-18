import GameOverDialog from './game-over-dialog';
import StartLevelDialog from './start-level-dialog';

const GameDialogs = () => {
	return (
		<>
			<StartLevelDialog></StartLevelDialog>
			<GameOverDialog></GameOverDialog>
		</>
	);
};

export default GameDialogs;
