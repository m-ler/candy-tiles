import { Button, ButtonProps } from '@mui/material';
import { muiPalette } from '../theme';

const SelectLevelButton = (props: ButtonProps): JSX.Element => (
	<Button
		{...props}
		sx={{
			width: '100%',
			minWidth: 20,
			aspectRatio: '1/1',
			backgroundColor: muiPalette.tertiary.main,
			fontSize: 20,
			color: 'white',
			fontWeight: 'bold',
			fontFamily: 'YellowCandy',
			'&:hover': {
				backgroundColor: muiPalette.tertiary.dark,
			},
		}}
	></Button>
);

export default SelectLevelButton;
