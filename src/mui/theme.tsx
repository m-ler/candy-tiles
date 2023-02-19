import { createTheme, PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
	interface PaletteOptions {
		tertiary: PaletteColor;
	}
}

type CustomMUIPalette = {
	primary: PaletteColor;
	secondary: PaletteColor;
	tertiary: PaletteColor;
};

export const muiPalette: CustomMUIPalette = {
	primary: {
		light: '#FFF6C3',
		main: '#BEB161',
		dark: '#A38946',
		contrastText: '#398388',
	},
	secondary: {
		light: '#C4ECDC',
		main: '#91D5BB',
		dark: '#398388',
		contrastText: '#A38946',
	},
	tertiary: {
		light: '#FFDBD0',
		main: '#FDB7A2',
		dark: '#EA915F',
		contrastText: '#FFF6C3',
	},
};

export const muiTheme = createTheme({
	palette: {
		...muiPalette,
		mode: 'dark',
		error: {
			light: '#e5738a',
			main: '#f4365c',
			dark: '#d32f55',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
});
