type Props = {
	id: string;
	children: JSX.Element | JSX.Element[];
	className?: string;
};

const CandyTilesDialog = ({ id, children, className }: Props) => {
	return (
		<div className={`absolute top-0 left-[50%] translate-x-[-50%] w-full h-full flex overflow-hidden p-[16px] ${className}`}>
			<div id={id} className="bg-p-dark w-full m-auto flex rounded-md p-[16px] shadow-2xl border border-p-main">
				{children}
			</div>
		</div>
	);
};

export default CandyTilesDialog;
