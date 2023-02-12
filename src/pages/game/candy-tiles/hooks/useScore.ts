import { useSetRecoilState } from 'recoil';
import { scoreState } from './../store/score';
import { useEffect } from 'react';
import { LEVEL_ELEMENTS_SCORES } from '../../../../config';
import { levelFxListState } from './../store/levelFxList';
import uuid from 'react-uuid';

export default (matched: boolean, index: number, type: string, color?: CandyColor): void => {
	const setScore = useSetRecoilState(scoreState);
	const setLevelFxList = useSetRecoilState(levelFxListState);

	useEffect(() => {
		matched && updateScore();
		matched && updateFXList();
	}, [matched]);

	const updateScore = () => {
		const scoreAmount = LEVEL_ELEMENTS_SCORES[type] || 0;

		setScore((score) => score + scoreAmount);
	};

	const updateFXList = () => {
		setLevelFxList((list) => [
			...list,
			{
				type: 'Score',
				color: color || 'White',
				id: uuid(),
				index,
				score: LEVEL_ELEMENTS_SCORES[type] || 0,
			} as ScoreFx,
		]);
	};
};
