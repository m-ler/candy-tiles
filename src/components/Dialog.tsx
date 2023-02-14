import { Dialog as MUIDialog, styled } from '@mui/material';

const Dialog = styled(MUIDialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		backgroundColor: '#143f42',
	},
}));

export default Dialog;
