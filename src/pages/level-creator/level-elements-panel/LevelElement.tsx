import { Tooltip } from '@mui/material';

type Props = {
	imageSrc: string;
	name: string;
};

const LevelElement = ({ imageSrc, name }: Props) => {
	return (
		<div className="flex gap-x-[16px] items-center border-b border-white/20 p-[12px] cursor-grab hover:bg-s-dark duration-200 rounded select-none">
			<Tooltip title={name}>
				<img src={imageSrc} className="w-[40px] aspect-square mx-auto"></img>
			</Tooltip>
		</div>
	);
};

export default LevelElement;
