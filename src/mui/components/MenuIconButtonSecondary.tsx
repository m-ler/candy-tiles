import { Button, ButtonProps } from '@mui/material';
import { muiPalette } from '../theme';

const MenuIconButtonSecondary = (props: ButtonProps): JSX.Element => (
	<Button
		{...props}
		sx={{
			width: '40px',
			minWidth: 40,
			aspectRatio: '1/1',
			backgroundColor: muiPalette.secondary.main,
			fontSize: 20,
			color: muiPalette.primary.dark,
			fontWeight: 'bold',
			fontFamily: 'YellowCandy',
			'&:hover': {
				backgroundColor: muiPalette.secondary.dark,
			},
			'& .MuiTouchRipple-child': {
				backgroundColor: muiPalette.secondary.light,
			},
		}}
	></Button>
);

export default MenuIconButtonSecondary;
