import GameOverDialog from './game-over-dialog';
import LevelCompleteDialog from './level-complete-dialog/LevelCompleteDialog';
import NoPossibleCombinationsDialog from './no-possible-combinations-dialog/NoPossibleCombinationsDialog';
import StartLevelDialog from './start-level-dialog';

const GameDialogs = () => {
	return (
		<>
			<StartLevelDialog></StartLevelDialog>
			<LevelCompleteDialog></LevelCompleteDialog>
			<GameOverDialog></GameOverDialog>
			<NoPossibleCombinationsDialog></NoPossibleCombinationsDialog>
		</>
	);
};

export default GameDialogs;
