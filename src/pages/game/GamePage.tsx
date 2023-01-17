import { atom, useRecoilValue } from 'recoil';
import CandyTiles from './candy-tiles';
import LevelSelectorPage from '../level-selector';
import useMountAnimation from '../../hooks/useMountAnimation';

type GamePageComponent = 'LevelSelector' | 'Game';
const defaultActiveComponent: GamePageComponent = 'Game';

export const gamePageActiveComponentState = atom({
	key: 'gamePageComponentWindow',
	default: defaultActiveComponent as GamePageComponent,
});

const GamePage = () => {
	const activeComponent = useRecoilValue(gamePageActiveComponentState);
	useMountAnimation('#game-container');

	const gamePageComponentList: { name: string; component: JSX.Element }[] = [
		{ name: 'LevelSelector', component: <LevelSelectorPage></LevelSelectorPage> },
		{ name: 'Game', component: <CandyTiles></CandyTiles> },
	];

	return (
		<section id='game-container' className='w-[min(1600px,100%)] m-auto flex p-[20px] gap-x-[15px]'>
			{gamePageComponentList.find(x => x.name === activeComponent)?.component}
		</section>
	);
};

export default GamePage;
