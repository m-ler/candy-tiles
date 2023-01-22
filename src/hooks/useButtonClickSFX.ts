import { useRecoilValue } from 'recoil';
import { userInteractedWithDocumentState } from '../store/userInteractedWithDocument';
import buttonClickSFX from './../assets/audio/buttonClick1.mp3';

export default (): (() => void) => {
	const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

	const playButtonClickSFX = (): void => {
		const buttonClickAudio = new Audio(buttonClickSFX);
		buttonClickAudio.volume = 0.5;
		userInteractedWithDocument && buttonClickAudio.play();
	};
	return () => playButtonClickSFX();
};
