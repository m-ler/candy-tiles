import { useRecoilValue } from 'recoil';
import { userInteractedWithDocumentState } from '../store/userInteractedWithDocument';
import wooshSFX from './../assets/audio/woosh1.mp3';

export default (): (() => void) => {
	const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

	const playWooshSFX = (): void => {
		const wooshAudio = new Audio(wooshSFX);
		wooshAudio.volume = 0.25;
		userInteractedWithDocument && wooshAudio.play();
	};
	return () => playWooshSFX();
};
