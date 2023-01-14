import { atom, useRecoilValue } from 'recoil';
import CandyTiles from './candy-tiles';
import LevelSelector from './level-selector';

type GamePageComponent = 'LevelSelector' | 'Game';
const defaultActiveComponent: GamePageComponent = 'LevelSelector';

export const gamePageActiveComponentState = atom({
	key: 'gamePageComponentWindow',
	default: defaultActiveComponent as GamePageComponent,
});

const GamePage = () => {
	const activeComponent = useRecoilValue(gamePageActiveComponentState);

	const gamePageComponentList: { name: string; component: JSX.Element }[] = [
		{ name: 'LevelSelector', component: <LevelSelector></LevelSelector> },
		{ name: 'Game', component: <CandyTiles></CandyTiles> },
	]; 

	return (
		<section className='w-screen m-auto max-w-[1600px] flex p-[20px] gap-x-[15px] border border-white/20'>
			{gamePageComponentList.find(x => x.name === activeComponent)?.component}
		</section>
	); 
};

export default GamePage; 
   