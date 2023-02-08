import { styled, Tooltip as TooltipMUI, tooltipClasses, TooltipProps } from '@mui/material';

const Tooltip = styled(({ className, ...props }: TooltipProps) => <TooltipMUI {...props} classes={{ popper: className }} />)(
	({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: 'rgba(20,20,20,0.4)',
			backdropFilter: 'blur(10px);',
			color: theme.palette.primary.light
		},
	}),
);

export default Tooltip;
