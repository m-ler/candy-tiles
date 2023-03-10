import { Button, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Container } from '@mui/system';
import SpaceIllustration from '../../../assets/svgr/SpaceIllustration';
import { TbArrowUpRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
	const navigate = useNavigate();
	return (
		<Container maxWidth="sm">
			<Stack alignItems="center" paddingX={2} paddingY={4}>
				<SpaceIllustration width={150} />
				<Typography fontWeight="700" fontSize={18} color={blueGrey[800]} paddingTop={3}>
					No levels
				</Typography>
				<Typography fontSize={14} color={blueGrey[500]} paddingBottom={3}>
					You have not created levels yet.
				</Typography>
				<Button
					variant="contained"
					color="secondary"
					disableElevation
					endIcon={<TbArrowUpRight size={18} />}
					onClick={() => navigate('/level-creator')}
				>
					Create level
				</Button>
			</Stack>
		</Container>
	);
};

export default EmptyState;
