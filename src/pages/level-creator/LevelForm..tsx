import { InputAdornment } from '@mui/material';
import { FaFlagCheckered } from 'react-icons/fa';
import { TbHandMove } from 'react-icons/tb';
import { BsSnow } from 'react-icons/bs';
import { MdIcecream } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import TextFieldMain from '../../mui/components/TextFieldMain';

const LevelForm = () => {
	return (
		<div className="flex flex-wrap gap-[12px] overflow-auto max-w-full justify-center md:[&>*]:grow">
			<TextFieldMain
				id="target-score"
				label="Target score"
				variant="filled"
				type="number"
				defaultValue={100}
				inputProps={{
					inputMode: 'numeric',
					min: 100,
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<FaFlagCheckered className="max-w-[12px]"></FaFlagCheckered>
						</InputAdornment>
					),
				}}
			></TextFieldMain>
			<TextFieldMain
				id="moves-number"
				label="Moves"
				variant="filled"
				type="number"
				defaultValue={10}
				inputProps={{
					inputMode: 'numeric',
					min: 1,
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<TbHandMove className="max-w-[12px]"></TbHandMove>
						</InputAdornment>
					),
				}}
			></TextFieldMain>

			<TextFieldMain
				id="ice-tiles"
				label="Ice tiles"
				variant="filled"
				type="number"
				defaultValue={0}
				inputProps={{
					inputMode: 'numeric',
					min: 0,
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<BsSnow className="max-w-[12px]"></BsSnow>
						</InputAdornment>
					),
				}}
			></TextFieldMain>

			<TextFieldMain
				id="rock-tiles"
				label="Rock tiles"
				variant="filled"
				type="number"
				defaultValue={0}
				inputProps={{
					inputMode: 'numeric',
					min: 0,
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<GiBrickWall className="max-w-[12px]"></GiBrickWall>
						</InputAdornment>
					),
				}}
			></TextFieldMain>
			<TextFieldMain
				id="ice-creams"
				label="Ice creams"
				variant="filled"
				type="number"
				defaultValue={0}
				inputProps={{
					inputMode: 'numeric',
					min: 0,
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MdIcecream className="max-w-[12px]"></MdIcecream>
						</InputAdornment>
					),
				}}
			></TextFieldMain>
		</div>
	);
};

export default LevelForm;
