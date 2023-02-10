import LevelProgressPanel from './level-progress-panel';
import Menu from './Menu';

const LeftPanel = () => {
	return (
		<div className="flex flex-col gap-[16px]  md:max-w-full">
			<Menu></Menu>
			<LevelProgressPanel></LevelProgressPanel>
		</div>
	);
};

export default LeftPanel;
