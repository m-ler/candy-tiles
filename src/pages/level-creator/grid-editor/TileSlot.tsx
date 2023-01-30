import { useRecoilState } from 'recoil';
import { tileListEditorState } from '../atoms/tileListEditor';

type Props = {
	index: number;
};

const TileSlot = ({ index }: Props) => {
	const [tileList, setTileList] = useRecoilState(tileListEditorState);
	const tileObj = tileList[index];

	const handleClick = () => {
		setTileList((list) => {
			const newList = [...list];
			newList[index] = tileObj?.type === 'Normal' ? null : { type: 'Normal' };
			return newList;
		});
		console.log(tileList[index]);
	};

	const handleMouseOver = (event: React.MouseEvent) => {
		if (event.buttons !== 1) return;
		setTileList((list) => {
			const newList = [...list];
			newList[index] = tileObj?.type === 'Normal' ? null : { type: 'Normal' };
			return newList;
		});
	};

	const setTileItems = () => {
		console.log('foo');
	};

	return (
		<div onMouseDown={handleClick} onMouseOver={handleMouseOver} className="border border-white/10 hover:bg-white/10 select-none">
			{tileObj?.type === 'Normal' ? <span className="bg-black/20 block h-full rounded pointer-events-none"></span> : <></>}
		</div>
	);
};

export default TileSlot;
