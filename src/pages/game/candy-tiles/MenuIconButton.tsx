import { Button, ButtonProps } from '@mui/material';
import { muiPalette } from '../../../config/mui-theme';

const MenuIconButton = (props: ButtonProps): JSX.Element => (
	<Button
		{...props}
		sx={{
			width: '40px',
			minWidth: 40,
			aspectRatio: '1/1',
			backgroundColor: muiPalette.primary.main,
			fontSize: 20,
			color: muiPalette.secondary.dark,
			fontWeight: 'bold',
			fontFamily: 'YellowCandy',
			'&:hover': {
				backgroundColor: muiPalette.primary.dark,
			},
			'& .MuiTouchRipple-child': {
				backgroundColor: muiPalette.primary.light,
			},
		}}
	></Button>
);

export default MenuIconButton;
