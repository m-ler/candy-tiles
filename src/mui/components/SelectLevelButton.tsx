import styled from '@emotion/styled';
import { Button, ButtonBaseTypeMap, ExtendButtonBaseTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { muiPalette } from '../theme';

const SelectLevelButtonStyled = styled(Button)(() => ({
	aspectRatio: '1/1',
	borderRadius: '5px',
	backgroundColor: muiPalette.tertiary.main,
	color: 'white',
	fontWeight: 'bold',
	fontFamily: 'YellowCandy',
	width: 'auto',
	minWidth: 20,
	fontSize: 20,
	'&:hover': {
		backgroundColor: muiPalette.tertiary.dark,
	},
}));

const SelectLevelButton = ({ children }: DefaultComponentProps<ExtendButtonBaseTypeMap<ButtonBaseTypeMap>>) => (
	<SelectLevelButtonStyled>{children}</SelectLevelButtonStyled>
);

export default SelectLevelButton;
