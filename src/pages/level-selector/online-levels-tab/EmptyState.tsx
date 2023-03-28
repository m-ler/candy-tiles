import { Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Container } from '@mui/system';
import UFOIllustration from '../../../assets/svgr/UFOIllustration';

const EmptyState = () => {
	return (
		<Container maxWidth="sm" data-cy="online-levels-empty-state">
			<Stack alignItems="center" paddingX={2} paddingY={4}>
				<UFOIllustration width={150} />
				<Typography fontWeight="700" fontSize={18} color={blueGrey[800]} paddingTop={3}>
					No levels avaliable
				</Typography>
				<Typography fontSize={14} color={blueGrey[500]}>
					It seems no one has created any levels yet...
				</Typography>
			</Stack>
		</Container>
	);
};

export default EmptyState;
