import GameOverDialog from './game-over-dialog';
import NoPossibleCombinationsDialog from './no-possible-combinations-dialog/NoPossibleCombinationsDialog';
import StartLevelDialog from './start-level-dialog';

const GameDialogs = () => {
	return (
		<>
			<StartLevelDialog></StartLevelDialog>
			<GameOverDialog></GameOverDialog>
			<NoPossibleCombinationsDialog></NoPossibleCombinationsDialog>
		</>
	);
};

export default GameDialogs;
