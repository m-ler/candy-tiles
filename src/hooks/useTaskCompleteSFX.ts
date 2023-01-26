import { useRecoilValue } from 'recoil';
import { userInteractedWithDocumentState } from '../store/userInteractedWithDocument';
import taskCompleteSFX from './../assets/audio/taskComplete.mp3';

export default (): (() => void) => {
	const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

	const playTaskCompleteSFX = (): void => {
		const taskCompleteAudio = new Audio(taskCompleteSFX);
		taskCompleteAudio.volume = 1;
		userInteractedWithDocument && taskCompleteAudio.play();
	};
	return () => playTaskCompleteSFX();
};
