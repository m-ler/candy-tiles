import { styled, TextField, TextFieldProps } from '@mui/material';
import { muiPalette } from '../theme';

const TextFieldMain = styled(TextField)(({ theme }) => ({
	width: '100%',
	'& .MuiInputBase-input, & .MuiFormLabel-root, & .MuiInputBase-root .MuiInputAdornment-root': {
		color: muiPalette.primary.main,
		fontFamily: 'YellowCandy',
	},
	'& .MuiInputBase-root.Mui-error .MuiInputAdornment-root': {
		color: theme.palette.error.main,
	},
	'& .MuiInputBase-input:focus, & .MuiFormLabel-root.Mui-focused, & .MuiInputBase-root.Mui-focused .MuiInputAdornment-root': {
		color: muiPalette.secondary.main,
	},
	'& .MuiFilledInput-root:before, & .MuiFilledInput-root:hover:before': {
		borderColor: muiPalette.primary.main,
	},
	'& .MuiFilledInput-root:hover:before': {
		borderColor: muiPalette.secondary.main,
	},
	'& .MuiFilledInput-root:after, & .MuiFilledInput-root.Mui-focused.Mui-error:after': {
		borderColor: muiPalette.secondary.main,
	},
}));
export default TextFieldMain;
