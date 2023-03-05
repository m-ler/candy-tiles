import { COLUMN_NUMBER, GRID_NUMBER, ROW_NUMBER } from '../../../config';
import useAudio from '../../../hooks/useAudio';

type Props = {
	setRenderList: (index: number, create: boolean) => void;
	renderChild: (index: number) => JSX.Element;
	interactable: boolean;
	childAttribute: string;
};

const GridEditorLayer = ({ setRenderList, renderChild, interactable, childAttribute }: Props) => {
	const playAudio = useAudio();	

	const handleMouse = (event: React.MouseEvent) => {
		const buttonDown = event.buttons === 1 || event.buttons === 2;
		const targetIsChild = (event.target as HTMLElement).hasAttribute(childAttribute);
		event.buttons === 2 && playAudio({ audioName: 'pop1', speed: 0.5});
		targetIsChild && buttonDown && interactable && setItems(parseInt((event.target as HTMLElement).getAttribute('data-index') || ''), event.buttons === 1);
	};

	const setItems = (index: number, create: boolean) => setRenderList(index, create);

	return (
		<div
			onMouseDown={handleMouse}
			onMouseOver={handleMouse}
			className="grid top-0 left-0 w-full h-full absolute top-0 left-0 gap-[0.5%]"
			style={{
				gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
				gridTemplateRows: `repeat(${ROW_NUMBER}, 1fr)`,
				pointerEvents: interactable ? 'all' : 'none',
			}}
		>
			{Array(GRID_NUMBER)
				.fill(null)
				.map((x, i) => renderChild(i))}
		</div>
	);
};

export default GridEditorLayer;
