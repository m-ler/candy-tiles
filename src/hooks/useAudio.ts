import { useRecoilValue } from 'recoil';
import { userInteractedWithDocumentState } from '../store/userInteractedWithDocument';

import buttonClick1 from './../assets/audio/buttonClick1.mp3';
import candyBounce from './../assets/audio/candyBounce.mp3';
import chocolateMatch from './../assets/audio/chocolateMatch.mp3';
import fusionMatch from './../assets/audio/fusionMatch.mp3';
import gameOver from './../assets/audio/gameOver.mp3';
import iceCrack1 from './../assets/audio/iceCrack1.mp3';
import iceCrack2 from './../assets/audio/iceCrack2.mp3';
import iceCreamMatch from './../assets/audio/iceCreamMatch.mp3';
import match from './../assets/audio/match.mp3';
import rockCrack1 from './../assets/audio/rockCrack1.mp3';
import rockCrack2 from './../assets/audio/rockCrack2.mp3';
import starScore from './../assets/audio/starScore.mp3';
import superCandyMatch from './../assets/audio/superCandyMatch.mp3';
import taskComplete from './../assets/audio/taskComplete.mp3';
import tileClick from './../assets/audio/tileClick.mp3';
import woosh1 from './../assets/audio/woosh1.mp3';

type AudioList = { [key in GameSFX]: string };
const audioList: AudioList = {
	buttonClick1,
	candyBounce,
	chocolateMatch,
	fusionMatch,
	gameOver,
	iceCrack1,
	iceCrack2,
	iceCreamMatch,
	match,
	rockCrack1,
	rockCrack2,
	starScore,
	superCandyMatch,
	taskComplete,
	tileClick,
	woosh1,
};

type AudioOptions = {
	audioName: GameSFX;
	volume?: number;
	speed?: number;
	preservePitch?: boolean;
};

export default (): ((options: AudioOptions) => HTMLAudioElement) => {
	const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

	return (options: AudioOptions) => {
		const audio = new Audio(audioList[options.audioName]);
		audio.volume = options.volume || 1;
		audio.playbackRate = options.speed || 1;
		audio.preservesPitch = options.preservePitch || false;
		audio.onended;
		userInteractedWithDocument && audio.play();
		return audio;
	};
};
