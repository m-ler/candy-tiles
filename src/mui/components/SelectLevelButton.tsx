import { Button, ButtonProps } from '@mui/material';
import { muiPalette } from '../theme';

const SelectLevelButton = (props: ButtonProps): JSX.Element => (
	<Button
		{...props}
		sx={{
			width: '100%',
			minWidth: 20,
			backgroundColor: muiPalette.secondary.main,
			fontSize: 20,
			color: 'white',
			fontWeight: 'bold',
			fontFamily: 'YellowCandy',
			'&:hover': {
				backgroundColor: muiPalette.tertiary.main,
			},
		}}
	></Button>
);

export default SelectLevelButton;
