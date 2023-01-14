import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import SelectLevelButton from '../../../mui/components/SelectLevelButton';

const levels: number[] = [1, 2, 3, 4, 5, 6];

const LevelSelector = () => {
	//const setGamePageActiveComponent = useSetRecoilState(gamePageActiveComponentState);
	const selectLevel = (): void => {
		alert('foo');
		//setGamePageActiveComponent('Game');
	}; 

	return (  
		<div
			className='grid bg-s-main rounded-lg overflow-auto max-w-[800px] mx-auto gap-[15px] p-[16px]'
			style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(50px, 1fr) )' }}
		> 
			{levels.map((level, index) => (
				<SelectLevelButton key={index} onClick={() => console.log('foo')}>
					{level}
				</SelectLevelButton> 
			))}
		</div>  
	);
};  

export default LevelSelector;
