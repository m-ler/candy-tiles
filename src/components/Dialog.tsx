import { Dialog as MUIDialog, styled } from '@mui/material';

const Dialog = styled(MUIDialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		/* backgroundColor: '#153B3E', */
	},
}));

export default Dialog;
