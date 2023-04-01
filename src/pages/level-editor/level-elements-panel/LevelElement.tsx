import { Tooltip } from '@mui/material';
import { useRecoilState } from 'recoil';
import { LevelItem, LevelTile } from '../../game/candy-tiles/types';
import { selectedElementState } from '../store/selectedElement';
import levelElementList from './level-element-list';

type Props = {
	elementId: number;
	imageSrc: string;
	name: string;
	elementData: LevelTile | LevelItem;
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
				data-cy={`editor-element-button-${name.replace(/\s/g, '-')}`}
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
