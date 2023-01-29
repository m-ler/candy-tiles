import { Button, IconButton, Tooltip } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { COLUMN_NUMBER, ROW_NUMBER } from '../../config';
import useMountAnimation from '../../hooks/useMountAnimation';
import LevelElementsPanel from './level-elements-panel';

const LevelCreatorPage = () => {
	useMountAnimation('#level-creator-container');

	return (
		<section
			className="h-[min(800px,100%)] max-h-[1000px] flex flex-col bg-black/25 rounded w-[min(850px,100%)] mx-auto shadow overflow-hidden"
			id="level-creator-container"
		>
			<div className="flex bg-s-dark px-[12px] py-[8px]">
				<Tooltip title="Cancel">
					<IconButton>
						<MdClose className="text-p-main"></MdClose>
					</IconButton>
				</Tooltip>

				<Button sx={{ fontWeight: 'bolder', marginLeft: 'auto' }}>Save</Button>
			</div>

			<div className="flex grow gap-x-[16px] p-[12px] overflow-hidden">
				<LevelElementsPanel></LevelElementsPanel>
				<div className="mx-auto aspect-square ">
					<div
						className="grid top-0 left-0 w-full h-full"
						style={{
							gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
							gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
						}}
					>
						{Array(81)
							.fill(null)
							.map((x, i) => (
								<span key={i} className="border border-white/10 hover:bg-white/10"></span>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LevelCreatorPage;
