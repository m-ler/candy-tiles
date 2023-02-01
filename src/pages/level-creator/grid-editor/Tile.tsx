type Props = {
	index: number;
	tileObj: LevelEditorElement | null;
	slotAvaliable: boolean;
};

const Tile = ({ index, tileObj, slotAvaliable }: Props) => {
	return (
		<div
			data-tile
			data-index={index}
			className="select-none hover:border-[5px] hover:border-s-main/50 hover:bg-s-main/10"
			style={{
				pointerEvents: slotAvaliable ? 'inherit' : 'none',
			}}
		>
			{tileObj ? <img src={tileObj.spriteSrc} className="pointer-events-none"></img> : <></>}
		</div>
	);
};

export default Tile;
