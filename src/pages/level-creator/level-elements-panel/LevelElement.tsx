import { useRecoilState } from 'recoil';
import { selectedElementState } from '../store/selectedElement';
import levelElementList from './level-element-list';
import Tooltip from './../../../mui/components/Tooltip';

type Props = {
	elementId: number;
	imageSrc: string;
	name: string;
	elementData: boolean | LevelItem;
};

const LevelElement = ({ elementId, imageSrc, name }: Props) => {
	const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState);
	const thisElementSelected = selectedElement?.id === elementId;

	const handleClick = () => {
		const elementObj = thisElementSelected ? null : levelElementList.find((x) => x.id === elementId);
		setSelectedElement(elementObj || null);
	};

	return (
		<Tooltip title={name}>
			<div
				onClick={handleClick}
				className={`flex gap-x-[16px] min-w-[50px] max-w-[50px] items-center p-[8px] cursor-pointer bg-black/20 hover:bg-t-dark duration-200 rounded select-none ${
					thisElementSelected ? 'bg-p-main border-[2px] border-p-light' : ''
				}`}
			>
				<img src={imageSrc} className=" aspect-square mx-auto pointer-events-none"></img>
			</div>
		</Tooltip>
	);
};

export default LevelElement;
