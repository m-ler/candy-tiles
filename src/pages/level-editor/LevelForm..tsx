import { Grid, InputAdornment } from '@mui/material';
import { FaFlagCheckered } from 'react-icons/fa';
import { TbHandMove } from 'react-icons/tb';
import { BsSnow } from 'react-icons/bs';
import { MdDriveFileRenameOutline, MdIcecream } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import TextFieldMain from '../../components/TextFieldMain';
import { useRecoilState } from 'recoil';
import { levelRulesState } from './store/levelRules';
import { levelEditorTitleState } from './store/levelEditorTitle';
import { LevelRules } from '../../types';

const LevelForm = () => {
	const [levelRules, setLevelRules] = useRecoilState<LevelRules>(levelRulesState);
	const [levelEditorTitle, setLevelEditorTitle] = useRecoilState(levelEditorTitleState);

	return (
		<Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 6 }}>
			<Grid item xs={1}>
				<TextFieldMain
					name="level-title"
					onChange={(e) => setLevelEditorTitle(e.target.value)}
					label="Title"
					variant="filled"
					value={levelEditorTitle}
					inputProps={{
						maxLength: 25,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<MdDriveFileRenameOutline className="max-w-[14px]"></MdDriveFileRenameOutline>
							</InputAdornment>
						),
					}}
				></TextFieldMain>
			</Grid>
			<Grid item xs={1}>
				<TextFieldMain
					name="level-target-score"
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							targetScore: parseInt(e.target.value),
						}))
					}
					onBlur={() =>
						isNaN(levelRules.targetScore) &&
						setLevelRules((state) => ({
							...state,
							targetScore: 100,
						}))
					}
					id="target-score"
					label="Target score"
					variant="filled"
					type="number"
					value={levelRules.targetScore || ''}
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
			<Grid item xs={1}>
				<TextFieldMain
					name="level-maximum-moves"
					onChange={(e) =>
						setLevelRules((state) => ({
							...state,
							maximumMoves: parseInt(e.target.value),
						}))
					}
					onBlur={() =>
						isNaN(levelRules.maximumMoves) &&
						setLevelRules((state) => ({
							...state,
							maximumMoves: 1,
						}))
					}
					id="moves-number"
					label="Moves"
					variant="filled"
					type="number"
					value={levelRules.maximumMoves || ''}
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
			<Grid item xs={1}>
				<TextFieldMain
					name="level-ice-tiles"
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
					value={levelRules.tasks.iceTiles || ''}
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
			<Grid item xs={1}>
				<TextFieldMain
					name="level-rock-tiles"
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
					value={levelRules.tasks.rockTiles || ''}
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
			<Grid item xs={1}>
				<TextFieldMain
					name="level-ice-creams"
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
					value={levelRules.tasks.iceCreams || ''}
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
