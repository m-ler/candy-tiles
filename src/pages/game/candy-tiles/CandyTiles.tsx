import { useEffect } from 'react';
import GameDialogs from './game-dialogs/GameDialogs';
import LevelContainer from './level-container';
import LevelProgressPanel from './level-progress-panel';
import LevelStateManager from './LevelStateManager';
import MenuPanel from './menu-panel';

const CandyTiles = () => {

	return (
		<>
			<LevelStateManager></LevelStateManager>
			<section className='w-[min(100%,860px)] max-h-full mx-auto rounded-lg shadow-lg flex items-center gap-x-[15px] relative'>
				<div className='flex flex-col gap-y-[16px]'>
					<MenuPanel></MenuPanel>
					<LevelProgressPanel></LevelProgressPanel>
				</div>
				<LevelContainer></LevelContainer>
				<GameDialogs></GameDialogs>
			</section>
		</>
	);
};

export default CandyTiles;
