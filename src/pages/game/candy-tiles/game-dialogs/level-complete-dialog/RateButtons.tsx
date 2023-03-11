import { LoadingButton } from '@mui/lab';
import { Paper, Stack } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { BsSuitHeartFill } from 'react-icons/bs';
import { ImHeartBroken } from 'react-icons/im';

type Props = {
	levelId: number;
	userLikes: number[];
	userDislikes: number[];
};

const RateButtons = ({ levelId, userLikes, userDislikes }: Props) => {
	const alreadyLiked = userLikes.includes(levelId);
	const alreadyDisliked = userDislikes.includes(levelId);

	return (
		<Stack component={Paper} bgcolor="primary.light" paddingX={2} paddingY={1} direction="row" justifyContent="space-between" spacing={2}>
			<LoadingButton
				startIcon={<ImHeartBroken color={blueGrey[500]} />}
				loadingPosition="start"
				variant={alreadyDisliked ? 'contained' : 'text'}
				disableElevation
				disabled={alreadyDisliked}
			>
				Dislike
			</LoadingButton>
			<LoadingButton
				startIcon={<BsSuitHeartFill color={red[500]} />}
				loadingPosition="start"
				variant={alreadyLiked ? 'contained' : 'text'}
				disableElevation
				disabled={alreadyLiked}
			>
				Like
			</LoadingButton>
		</Stack>
	);
};

export default RateButtons;
