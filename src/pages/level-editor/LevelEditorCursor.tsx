import { useRecoilValue } from 'recoil';
import { selectedElementState } from './store/selectedElement';
import { useEffect, useState } from 'react';
import useFollowCursor from '../../hooks/useFollowCursor';
import { FaEraser } from 'react-icons/fa';

const LevelEditorCursor = () => {
	const [cursorElement, setCursorElement] = useState<HTMLDivElement | null>(null);
	const selectedElement = useRecoilValue(selectedElementState);
	const [holdingRightMouseButton, setHoldingRightMouseButton] = useState(false);
	useFollowCursor(cursorElement as HTMLElement);

	useEffect(() => {
		document.addEventListener('mousedown', onMouseButton);
		document.addEventListener('mouseup', onMouseButton);
		return () => {
			document.removeEventListener('mousedown', onMouseButton);
			document.removeEventListener('mouseup', onMouseButton);
		};
	}, []);

	const onMouseButton = (e: MouseEvent) => {
		setHoldingRightMouseButton(e.buttons === 2);
	};

	return (
		<div ref={setCursorElement} className="fixed pointer-events-none" data-cy="level-editor-cursor">
			{holdingRightMouseButton ? (
				<FaEraser className="block text-t-dark translate-x-1/2 translate-y-1/2" size={30}></FaEraser>
			) : selectedElement ? (
				<img src={selectedElement.spriteSrc} className="w-[40px] translate-x-1/2 translate-y-1/2"></img>
			) : (
				<></>
			)}
		</div>
	);
};

export default LevelEditorCursor;
