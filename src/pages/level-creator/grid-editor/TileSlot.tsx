import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { elementListEditorState } from '../atoms/elementListEditor';
import { selectedElementState } from '../atoms/selectedElement';
import { tileListEditorState } from '../atoms/tileListEditor';

type Props = {
	index: number;
};

const TileSlot = ({ index }: Props) => {
	const [tileList, setTileList] = useRecoilState(tileListEditorState);
	const setElementList = useSetRecoilState(elementListEditorState);
	const selectedElement = useRecoilValue(selectedElementState);
	const tileObj = tileList[index];

	const handleClick = () => {
		setTileList((list) => {
			const newList = [...list];
			newList[index] = tileObj?.type === 'Normal' ? null : { type: 'Normal' };
			return newList;
		});

		if (!selectedElement) return;

		setElementList((list) => {
			const newList = [...list];
			newList[index] = selectedElement;
			return newList;
		});
	};

	const handleMouseOver = (event: React.MouseEvent) => {
		if (event.buttons !== 1) return;
		setTileList((list) => {
			const newList = [...list];
			newList[index] = tileObj?.type === 'Normal' ? null : { type: 'Normal' };
			return newList;
		});

		if (!selectedElement) return;

		setElementList((list) => {
			const newList = [...list];
			newList[index] = selectedElement;
			return newList;
		});
	};

	const setTileItems = () => {
		console.log('foo');
	};

	return (
		<div onMouseDown={handleClick} onMouseOver={handleMouseOver} className="border border-white/10 hover:bg-white/10 select-none">
			{tileObj?.type === 'Normal' ? <span className="bg-black/25 block h-full rounded pointer-events-none"></span> : <></>}
		</div>
	);
};

export default TileSlot;
