import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from './store/matchList';
import { levelItemsState } from './store/levelItems';
import { levelTilesState } from './store/levelTiles';
import { scoreListState } from './store/scoreList';
import { scoreState } from './store/score';

const ScoreManager = () => {
	const setScorelList = useSetRecoilState(scoreListState);
	const setScore = useSetRecoilState(scoreState);
	const matchList = useRecoilValue(matchListState);
	const itemList = useRecoilValue(levelItemsState);
	const tileList = useRecoilValue(levelTilesState);

	useEffect(() => {
		const matchedList = matchList.filter((x) => x.matched);
		setScorelList();
		console.log(matchList);
	}, [matchList]);

	return <></>;
};

export default ScoreManager;
