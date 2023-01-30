import { useRecoilValue } from 'recoil';
import { selectedElementState } from './atoms/selectedElement';
import { useState } from 'react';
import useFollowCursor from '../../hooks/useFollowCursor';
const SelectedLevelCursor = () => {
	const [imgElement, setImgElement] = useState<HTMLDivElement | null>(null);
	useFollowCursor(imgElement as HTMLElement);

	const selectedElement = useRecoilValue(selectedElementState);

	return selectedElement ? (
		<img
			ref={setImgElement}
			src={selectedElement.spriteSrc}
			className="fixed pointer-events-none w-[40px] translate-x-1/2 translate-y-1/2"
		></img>
	) : (
		<></>
	);
};

export default SelectedLevelCursor;
