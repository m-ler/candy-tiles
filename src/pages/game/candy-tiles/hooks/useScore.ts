import { useSetRecoilState, useRecoilValue } from 'recoil';
import { scoreState } from './../store/score';
import { useEffect } from 'react';
import { LEVEL_ELEMENTS_SCORES } from '../../../../config';
import { levelFxListState } from './../store/levelFxList';
import uuid from 'react-uuid';
import { comboCountState } from './../store/comboCount';

export default (matched: boolean, index: number, type: string, color?: CandyColor): void => {
	const setScore = useSetRecoilState(scoreState);
	const comboCount = useRecoilValue(comboCountState);
	const setLevelFxList = useSetRecoilState(levelFxListState);

	useEffect(() => {
		matched && onMatch();
	}, [matched]);

	const onMatch = () => {
		const scoreAmount = (LEVEL_ELEMENTS_SCORES[type] || 0) * comboCount;
		setScore((score) => score + scoreAmount);
		updateFXList(scoreAmount);
	};

	const updateFXList = (score: number) => {
		const isTile = ['IceTile', 'RockTile'].includes(type);
		setLevelFxList((list) => [
			...list,
			{
				type: isTile ? 'TileScore' : 'CandyScore',
				color: color || 'White',
				id: uuid(),
				index,
				score,
			} as LevelFX,
		]);
	};
};
