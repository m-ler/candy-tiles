import { Avatar, Card, CardActionArea, Slide, Typography } from '@mui/material';
import { blueGrey, grey, red, yellow } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { MdBarChart, MdStarRate } from 'react-icons/md';
import { ImHeart, ImHeartBroken } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { LevelWithUserDB } from '../../types/database-aliases';
import Tooltip from '../../mui/components/Tooltip';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../../store/loggedUser';
import { completedLevelsState } from '../../store/completedLevels';

type Props = {
	level: LevelWithUserDB;
	actions?: React.ReactNode;
};

const LevelCard = ({ level, actions }: Props) => {
	const loggedUser = useRecoilValue(loggedUserState);
	const navigate = useNavigate();
	const levelDate = new Date(level.created_at || '').toLocaleDateString().slice(0, 10);
	const karma = (level.likes || 0) - (level.dislikes || 0);
	const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });
	const localCompletedLevels = useRecoilValue(completedLevelsState);
	const completedOnlineLevels = loggedUser ? loggedUser.profile.completedLevels.online : localCompletedLevels.online;
	const stars = completedOnlineLevels.find((x) => x.id === level.id)?.stars || 0;

	return (
		<Slide in={true}>
			<Card
				sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, border: '1px solid', borderColor: blueGrey[50], flexShrink: 0 }}
				elevation={0}
			>
				<CardActionArea onClick={() => navigate(`/level/${level.id}`)}>
					<Stack padding={2} gap={2} display="flex" justifyContent="space-between" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Avatar alt={level.user.nickname} src={level.user.avatarURL || ''} sx={{ width: 42, height: 42 }}>
								{level.user.nickname.toLocaleUpperCase()[0] || ''}
							</Avatar>
							<Stack>
								<Typography variant="h6" fontSize="1rem" color={blueGrey[900]}>
									{level.title}
								</Typography>

								<Typography variant="body2" fontSize="0.75rem" color={grey[500]}>
									{`${level.user.nickname} | ${levelDate}`}
								</Typography>
								<Tooltip title="Your score">
									<Stack direction="row" marginTop={0.5}>
										<MdStarRate color={stars >= 1 ? yellow[700] : blueGrey[100]} />
										<MdStarRate color={stars >= 2 ? yellow[700] : blueGrey[100]} />
										<MdStarRate color={stars >= 3 ? yellow[700] : blueGrey[100]} />
									</Stack>
								</Tooltip>
							</Stack>
						</Stack>
					</Stack>
				</CardActionArea>
				<Stack
					gap={1.5}
					alignItems="center"
					color={blueGrey[500]}
					borderTop="solid"
					borderColor={blueGrey[50]}
					margin="auto 0"
					direction="row"
					sx={{
						justifyContent: { xs: 'left', sm: 'center' },
						borderTopWidth: { xs: '1px', sm: '0px' },
						paddingY: { xs: 2, sm: 0 },
						paddingX: 2,
					}}
				>
					<Stack gap={1} sx={{ flexDirection: { xs: 'row', sm: 'column' } }}>
						<Tooltip title="Karma">
							<Stack direction="row" alignItems="center" spacing={0.6}>
								{karma >= 0 ? <ImHeart color={karma === 0 ? blueGrey[400] : red[400]} /> : <ImHeartBroken color={blueGrey[900]} />}
								<Typography fontSize="0.75rem">{numberFormatter.format(karma)}</Typography>
							</Stack>
						</Tooltip>
						<Tooltip title="Times played">
							<Stack direction="row" alignItems="center" spacing={0.6}>
								<MdBarChart />
								<Typography fontSize="0.75rem">{numberFormatter.format(level.timesPlayed)}</Typography>
							</Stack>
						</Tooltip>
					</Stack>
					{actions}
				</Stack>
			</Card>
		</Slide>
	);
};

export default LevelCard;
