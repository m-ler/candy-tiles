import { useState } from 'react';
import { TileProps } from './Tile';

const RockTile = ({ index }: TileProps) => {
	const [damaged, setDamaged] = useState(false);

	return (
		<div className="relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded" data-index={index} data-tile>
			<img src={damaged ? '/img/tiles/rock.png' : '/img/tiles/rock2.png'} className="pointer-events-none"></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-white/50 font-bold hidden">{index}</span>
		</div>
	);
};

export default RockTile;
