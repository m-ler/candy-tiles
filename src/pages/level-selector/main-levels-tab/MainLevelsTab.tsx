import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { completedLevelsState } from '../../../store/completedLevels';
import { loggedUserState } from '../../../store/loggedUser';
import SelectLevelButton from './SelectLevelButton';

const MainLevelsTab = () => {
	const localCompletedLevels = useRecoilValue(completedLevelsState);
	const loggedUser = useRecoilValue(loggedUserState);

	const completedLevels = loggedUser ? loggedUser.profile.completedLevels : localCompletedLevels;

	return (
		<Grid container columns={{ xs: 2, sm: 4, md: 8 }} spacing={2} padding={2}>
			{new Array(50).fill(0).map((x, index) => {
				const levelAvaliable = index === 0 || completedLevels.main.some((x) => x.id === index);
				const stars = completedLevels.main.find((x) => x.id === index + 1)?.stars || 0;
				return (
					<Grid item xs={1} key={index}>
						<SelectLevelButton locked={!levelAvaliable} stars={stars} levelId={index + 1} />{' '}
					</Grid>
				);
			})}
		</Grid>
	);
};

export default MainLevelsTab;
