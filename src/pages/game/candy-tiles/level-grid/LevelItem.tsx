import { useEffect, useRef } from 'react';
import { useLevelFXContext } from '../../../../context/LevelFXContext';
import Candy from './level-items/Candy';
import LevelManager from './level-manager';

type LevelItemProps = {
	item: LevelItem;
	index: number;
	id: string;
};

const getItemComponent = (item: LevelItem): JSX.Element => {
	switch (item?.type) {
		case 'Candy':
			return <Candy color={item.color}></Candy>;
		default:
			return <div></div>;
	}
};

const LevelItem = ({ id, item }: LevelItemProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const rowIndexRef = useRef<number>(0);
	const columnIndexRef = useRef<number>(0);
	const positionXRef = useRef<number>(0);
	const positionYRef = useRef<number>(-500);
	const levelFXContext = useLevelFXContext();

	useEffect(() => {
    console.log(levelFXContext);
    
		updatePosition();
		LevelManager.subscribeItemsChange(onLevelItemsChanged);

		return () => {
			LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
		};
	}, []);

	const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
		const itemMatched = !items.some(x => x?.key === id);
		itemMatched && updateOpacity('0');
		!itemMatched && updatePosition();
		levelFXContext?.updateLevelFXList([
			...levelFXContext.levelFXList,
			{ type: 'Poof', duration: 2000, index: LevelManager.levelData.items.findIndex(x => x?.key === id) },
		]);
	};

	const updateGridPosition = (updateX: boolean = true, updateY: boolean = true): void => {
		const gridIndex = LevelManager.levelData.items.findIndex(x => x?.key === id);
		rowIndexRef.current = Math.ceil((gridIndex + 1) / 9);
		columnIndexRef.current = gridIndex + 1 - (rowIndexRef.current - 1) * 9;
		updateX && (positionXRef.current = 100 * (columnIndexRef.current - 1));
		updateY && (positionYRef.current = 100 * (rowIndexRef.current - 1));
	};

	const updatePosition = (): void => {
		updateGridPosition();
		if (elementRef.current) {
			elementRef.current.style.transform = `translate(${positionXRef.current}%, ${positionYRef.current}%)`;
		}
	};

	const updateOpacity = (value: string): void => {
		if (elementRef.current) elementRef.current.style.opacity = value;
	};

	updateGridPosition(true, false);

	return (
		<div
			className={`w-[calc(100%/9)] p-[1.7%] aspect-square block absolute duration-300`}
			style={{
				transform: `translate(${positionXRef.current}%, ${positionYRef.current}%)`,
			}}
			ref={elementRef}
		>
			{getItemComponent(item)}
		</div>
	);
};

export default LevelItem;
