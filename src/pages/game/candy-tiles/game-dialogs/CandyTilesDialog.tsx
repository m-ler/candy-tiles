import { Slide } from '@mui/material';

type Props = {
	children: JSX.Element | JSX.Element[];
	className?: string;
};

const CandyTilesDialog = ({ children, className }: Props) => {
	return (
		<Slide in={true}>
			<div className={`absolute top-0 w-full h-full flex overflow-hidden p-[16px]`}>
				<div className={`bg-p-dark w-full m-auto flex rounded-md p-[16px] shadow-2xl border border-p-main ${className}`}>{children}</div>
			</div>
		</Slide>
	);
};

export default CandyTilesDialog;
