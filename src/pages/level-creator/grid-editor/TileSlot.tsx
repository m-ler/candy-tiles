type Props = {
	index: number;
	slotAvaliable: boolean;
};

const TileSlot = ({ index, slotAvaliable }: Props) => {
	return (
		<div
			data-tile-slot
			data-index={index}
			className={`border select-none hover:bg-white/10 ${slotAvaliable ? 'border-white/20' : 'border-white/5'}`}
		>
			{slotAvaliable ? <span className="bg-black/20 block h-full rounded pointer-events-none"></span> : <></>}
		</div>
	);
};

export default TileSlot;
