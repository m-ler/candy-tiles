import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import TileSlot from './TileSlot';

const TileGridEditor = () => {
	return (
		<div
			className="grid top-0 left-0 w-full h-full"
			style={{
				gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
				gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
			}}
		>
			{Array(GRID_NUMBER)
				.fill(null)
				.map((x, i) => (
					<TileSlot key={i} index={i}></TileSlot>
				))}
		</div>
	);
};

export default TileGridEditor;
