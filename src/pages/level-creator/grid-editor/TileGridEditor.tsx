import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import TileElement from './TileElement';
import TileSlot from './TileSlot';

const TileGridEditor = () => {
	return (
		<>
			<div
				className="grid top-0 left-0 w-full h-full absolute top-0 left-0"
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
			<div
				className="grid top-0 left-0 w-full h-full absolute top-0 left-0 pointer-events-none"
				style={{
					gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
					gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
				}}
			>
				{Array(GRID_NUMBER)
					.fill(null)
					.map((x, i) => (
						<TileElement key={i} index={i}></TileElement>
					))}
			</div>
		</>
	);
};

export default TileGridEditor;
