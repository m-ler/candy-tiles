import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { levelItemsState } from '../../../atoms/levelItems';

const ALLOWED_ITEM_TYPES = ['Candy', 'SuperCandy', 'Chocolate'];
export default (index: number, tileElementState: HTMLElement) => {
	const levelItems = useRecoilValue(levelItemsState);

	useEffect(() => {
		tileElementState && validateItemType();
	}, [levelItems, tileElementState]);

	const validateItemType = () => {
		const type = levelItems[index]?.type;
		const allowedType = ALLOWED_ITEM_TYPES.includes(type || '');
		
		allowedType ? tileElementState.setAttribute('data-tile', '') : tileElementState.removeAttribute('data-tile');
		tileElementState.style.cursor = allowedType ? 'default' : 'not-allowed';
	};
};
