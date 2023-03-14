type Props = {
	children: JSX.Element | JSX.Element[];
	index: number;
	value: number;
	className?: string;
};

const TabPanel = (props: Props) => {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && <> {children}</>}
		</div>
	);
};

export default TabPanel;
