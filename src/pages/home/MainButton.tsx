import { Button, ButtonProps, styled } from '@mui/material';

const MainButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.primary.light,
	backgroundColor: 'rgba(0,0,0,0.15)',
	fontSize: '2.25rem',
	padding: '1rem 2rem'
}));
export default MainButton;
