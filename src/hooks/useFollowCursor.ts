import { useEffect } from 'react';
export default (elementState: HTMLElement): void => {
	useEffect(() => {
		document.addEventListener('mousemove', followCursor);
		return () => {
			document.removeEventListener('mousemove', followCursor);
		};
	}, [elementState]);

	const followCursor = (e: MouseEvent) => {
		if (!elementState) return;

		const left = e.pageX;
		const top = e.pageY;
		elementState.style.left = left + 'px';
		elementState.style.top = top + 'px';
	};
};
