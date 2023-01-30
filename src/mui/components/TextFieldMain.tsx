import { TextField, TextFieldProps } from '@mui/material';
import { muiPalette } from '../theme';

const TextFieldMain = (props: TextFieldProps): JSX.Element => (
	<TextField
		{...props}
		sx={{
			'& .MuiInputBase-input, & .MuiFormLabel-root, & .MuiInputBase-root .MuiInputAdornment-root': {
				color: muiPalette.primary.main,
				fontFamily: 'YellowCandy',
			},
			'& .MuiInputBase-input:focus, & .MuiFormLabel-root.Mui-focused, & .MuiInputBase-root.Mui-focused .MuiInputAdornment-root': {
				color: muiPalette.secondary.main,
			},
			'& .MuiFilledInput-root:before, & .MuiFilledInput-root:hover:before': {
				borderColor: muiPalette.primary.main,
			},
			'& .MuiFilledInput-root:after': {
				borderColor: muiPalette.secondary.main,
			},
		}}
	></TextField>
);

export default TextFieldMain;
