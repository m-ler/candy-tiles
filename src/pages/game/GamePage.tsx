import { atom, useRecoilValue } from 'recoil';
import CandyTiles from './candy-tiles';
import LevelSelectorPage from '../level-selector';
import anime from 'animejs';
import { useEffect } from 'react';

type GamePageComponent = 'LevelSelector' | 'Game';
const defaultActiveComponent: GamePageComponent = 'Game';

export const gamePageActiveComponentState = atom({
	key: 'gamePageComponentWindow',
	default: defaultActiveComponent as GamePageComponent,
});

const animateMount = () => {
	anime({
		targets: '#game-container',
		opacity: [0, 1],
		translateY: [500, 0],
		easing: 'easeOutBack',
		duration: 300,
		endDelay: 200,
	});
};

const GamePage = () => {
	const activeComponent = useRecoilValue(gamePageActiveComponentState);
	useEffect(() => {
		animateMount();
	});

	const gamePageComponentList: { name: string; component: JSX.Element }[] = [
		{ name: 'LevelSelector', component: <LevelSelectorPage></LevelSelectorPage> },
		{ name: 'Game', component: <CandyTiles></CandyTiles> },
	];

	return (
		<section id='game-container' className='w-[min(1600px,100%)] m-auto flex p-[20px] gap-x-[15px] border border-white/20'>
			{gamePageComponentList.find(x => x.name === activeComponent)?.component}
		</section>
	);
};

export default GamePage;
