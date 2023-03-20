import { LoadingButton } from '@mui/lab';
import { Paper, Stack } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { BsSuitHeartFill } from 'react-icons/bs';
import { ImHeartBroken } from 'react-icons/im';
import { useMutation } from 'react-query';
import { refreshSession } from '../../../../api/auth';
import { rateLevel } from '../../../../api/levels';
import useLoggedUser from '../../../../hooks/useLoggedUser';
import useSelectedLevel from '../../../../hooks/useSelectedLevel';
import { UserProfileData } from '../../../../types';

const RateLevelButtons = () => {
	const loggedUser = useLoggedUser();
	const selectedLevel = useSelectedLevel();
	const levelId = useSelectedLevel().data?.id || 0;
	const userProfile = loggedUser?.profile || ({} as UserProfileData);

	const likeMutation = useMutation(() => rateLevel(levelId, userProfile.id, true), {
		onSuccess: refreshSession,
	});
	const dislikeMutation = useMutation(() => rateLevel(levelId, userProfile.id, false), {
		onSuccess: refreshSession,
	});

	const alreadyLiked = (userProfile.likedLevels || []).includes(levelId);
	const alreadyDisliked = (userProfile.dislikedLevels || []).includes(levelId);

	const canRate = !selectedLevel.data?.isMainLevel && !!loggedUser;

	return canRate ? (
		<Stack component={Paper} bgcolor="primary.light" paddingX={2} paddingY={1} direction="row" justifyContent="space-between" spacing={2}>
			<LoadingButton
				startIcon={<ImHeartBroken color={blueGrey[500]} />}
				loadingPosition="start"
				variant={alreadyDisliked ? 'contained' : 'text'}
				disableElevation
				disabled={alreadyDisliked || likeMutation.isLoading}
				loading={dislikeMutation.isLoading}
				onClick={() => dislikeMutation.mutate()}
			>
				Dislike
			</LoadingButton>
			<LoadingButton
				startIcon={<BsSuitHeartFill color={red[500]} />}
				loadingPosition="start"
				variant={alreadyLiked ? 'contained' : 'text'}
				disableElevation
				disabled={alreadyLiked || dislikeMutation.isLoading}
				loading={likeMutation.isLoading}
				onClick={() => likeMutation.mutate()}
			>
				Like
			</LoadingButton>
		</Stack>
	) : (
		<></>
	);
};

export default RateLevelButtons;
