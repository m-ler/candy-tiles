import { useRecoilValue } from 'recoil';
import { levelFxListState } from '../../atoms/levelFxList';
import ScoreFX from '../fx/ScoreFX';
import SuperCandyMatchFX from '../fx/SuperCandyMatchFX';

const getFXComponent = (fx: LevelFX): JSX.Element => {
	switch (fx.type) {
		case 'Score':
			return <ScoreFX color={fx.color} score={fx.score} index={fx.index} key={fx.key} id={fx.key}></ScoreFX>;
		case 'SuperCandy':
			return <SuperCandyMatchFX color={fx.color} index={fx.index} key={fx.key} id={fx.key}></SuperCandyMatchFX>;
	}
};

const FXGrid = () => {
	const levelFxList = useRecoilValue(levelFxListState);

	return <div className="pointer-events-none grid absolute top-0 left-0 w-full h-full">{levelFxList.map((fx) => getFXComponent(fx))}</div>;
};

export default FXGrid;
