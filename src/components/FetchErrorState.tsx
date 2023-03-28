import { Container, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import DonutLoveIllustration from '../assets/svgr/DonutLoveIllustration';

const FetchErrorState = () => {
	return (
		<Container maxWidth="sm" data-cy="fetch-error-state-message">
			<Stack alignItems="center" paddingX={2} paddingY={4}>
				<DonutLoveIllustration width={150} />
				<Typography fontWeight="700" fontSize={18} color={blueGrey[800]} paddingTop={3}>
					Ooops!
				</Typography>
				<Typography fontSize={14} color={blueGrey[500]} paddingBottom={3}>
					Something went wrong. This may be due to a problem with the internet connection.
				</Typography>
			</Stack>
		</Container>
	);
};

export default FetchErrorState;
