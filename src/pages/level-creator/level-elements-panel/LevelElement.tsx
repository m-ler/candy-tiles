import { Tooltip } from '@mui/material';

type Props = {
	imageSrc: string;
	name: string;
};

const LevelElement = ({ imageSrc, name }: Props) => {
	return (
		<Tooltip title={name}>
			<div className="flex gap-x-[16px] min-w-[50px] max-w-[50px] items-center p-[8px] cursor-grab bg-black/20 hover:bg-t-dark duration-200 rounded select-none">
				<img src={imageSrc} className=" aspect-square mx-auto pointer-events-none"></img>
			</div>
		</Tooltip>
	);
};

export default LevelElement;
