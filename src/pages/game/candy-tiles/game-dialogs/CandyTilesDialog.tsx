type Props = {
	id: string;
	children: JSX.Element | JSX.Element[];
};

const CandyTilesDialog = ({ id, children }: Props) => {
	return (
		<div className='absolute top-0 left-0 w-full h-full flex overflow-hidden p-[16px]'>
			<div
				id={id}
				className='bg-p-dark w-full m-auto flex rounded-md p-[16px] shadow-2xl border border-p-main'
			>
				{children}
			</div>
		</div>
	);
};

export default CandyTilesDialog;
