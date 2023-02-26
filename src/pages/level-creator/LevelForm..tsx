import { Grid, InputAdornment } from '@mui/material';
import { FaFlagCheckered } from 'react-icons/fa';
import { TbHandMove } from 'react-icons/tb';
import { BsSnow } from 'react-icons/bs';
import { MdIcecream } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import TextFieldMain from '../../mui/components/TextFieldMain';
import { useSetRecoilState } from 'recoil';
import { levelRulesState } from './store/levelRules';

const LevelForm = () => {
	const setLevelRules = useSetRecoilState(levelRulesState);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={2.4}>
				<TextFieldMain
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							targetScore: parseInt(e.target.value),
						}))
					}
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
			</Grid>
			<Grid item xs={12} sm={6} md={2.4}>
				<TextFieldMain
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							maximumMoves: parseInt(e.target.value),
						}))
					}
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
			</Grid>
			<Grid item xs={12} sm={6} md={2.4}>
				<TextFieldMain
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							tasks: {
								...state.tasks,
								iceTiles: parseInt(e.target.value),
							},
						}))
					}
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
			</Grid>
			<Grid item xs={12} sm={6} md={2.4}>
				<TextFieldMain
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							tasks: {
								...state.tasks,
								rockTiles: parseInt(e.target.value),
							},
						}))
					}
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
			</Grid>
			<Grid item xs={12} sm={6} md={2.4}>
				<TextFieldMain
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							tasks: {
								...state.tasks,
								iceCreams: parseInt(e.target.value),
							},
						}))
					}
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
			</Grid>
		</Grid>
	);
};

export default LevelForm;
