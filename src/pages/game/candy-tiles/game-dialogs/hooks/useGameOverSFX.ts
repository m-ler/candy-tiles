import { useRecoilValue } from 'recoil';
import { userInteractedWithDocumentState } from '../../../../../store/userInteractedWithDocument';
import gameOverSFX from './../../../../../assets/audio/gameOver.mp3';

export default (): (() => void) => {
	const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

	const playGameOverSFX = (): void => {
		const gameOverAudio = new Audio(gameOverSFX);
		gameOverAudio.volume = 0.7;
		userInteractedWithDocument && gameOverAudio.play();
	};
	return () => playGameOverSFX();
};
