import { useRecoilValue } from 'recoil';
import { levelFxListState } from '../../store/levelFxList';
import { LevelFX } from '../../types';
import CandyScoreFX from '../fx/CandyScoreFX';
import SuperCandyMatchFX from '../fx/SuperCandyMatchFX';
import TileScoreFX from '../fx/TileScoreFX';

const getFXComponent = (fx: LevelFX) => {
	switch (fx.type) {
		case 'CandyScore':
			return <CandyScoreFX color={fx.color} score={fx.score} index={fx.index} key={fx.id} id={fx.id}></CandyScoreFX>;
		case 'TileScore':
			return <TileScoreFX score={fx.score} index={fx.index} key={fx.id} id={fx.id}></TileScoreFX>;
		case 'SuperCandy':
			return <SuperCandyMatchFX color={fx.color} index={fx.index} key={fx.id} id={fx.id}></SuperCandyMatchFX>;
	}
};

const FXGrid = () => {
	const levelFxList = useRecoilValue(levelFxListState);

	return <div className="pointer-events-none grid absolute top-0 left-0 w-full h-full">{levelFxList.map((fx) => getFXComponent(fx))}</div>;
};

export default FXGrid;
