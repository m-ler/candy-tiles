type Props = {
	index: number;
	itemObj: LevelEditorElement | null;
	slotAvaliable: boolean;
};

const Item = ({ index, itemObj, slotAvaliable }: Props) => {
	return (
		<div
			data-item
			data-index={index}
			className=" p-[15%] select-none hover:border-[5px] hover:border-t-main/50 hover:bg-s-main/10"
			style={{
				pointerEvents: slotAvaliable ? 'inherit' : 'none',
			}}
		>
			{itemObj ? <img src={itemObj.spriteSrc} className="pointer-events-none"></img> : <></>}
		</div>
	);
};

export default Item;
