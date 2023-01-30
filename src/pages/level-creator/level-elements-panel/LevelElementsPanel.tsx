import LevelElement from './LevelElement';
import levelElementList from './level-element-list';

const LevelElementsPanel = () => {
	return (
		<div className="flex w-full overflow-auto max-w-full bg-s-dark p-[6px] duration-200 rounded gap-x-[10px]">
			{levelElementList.map((element) => (
				<LevelElement
					elementId={element.id}
					imageSrc={element.spriteSrc}
					elementData={element.elementObj}
					name={element.name}
					key={element.id}
				></LevelElement>
			))}
		</div>
	);
};

export default LevelElementsPanel;
