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

	return (
		<div onClick={handleClick} className="border border-white/10 hover:bg-white/10">
			{tileObj?.type === 'Normal' ? <span className="bg-black/20 block h-full rounded"></span> : <></>}
		</div>
	);
};

export default TileSlot;
