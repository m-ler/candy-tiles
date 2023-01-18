type Props = {
	children: JSX.Element;
};

const TargetItem = ({ children }: Props) => {
	return <div className='p-[12px] bg-black/25 rounded'>{children}</div>;
};

export default TargetItem;
