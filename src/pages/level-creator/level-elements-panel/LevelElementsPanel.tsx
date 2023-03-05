import LevelElement from './LevelElement';
import levelElementList from './level-element-list';
import { Box } from '@mui/material';

const LevelElementsPanel = () => {
	return (
		<Box display="flex" width="100%" maxWidth="100%" overflow="auto">
			<div className="flex gap-2 mx-auto pb-2">
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
		</Box>
	);
};

export default LevelElementsPanel;
