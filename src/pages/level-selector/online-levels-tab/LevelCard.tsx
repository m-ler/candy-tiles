import { Avatar, Card, CardActionArea, Slide, Typography } from '@mui/material';
import { blueGrey, grey, red, yellow } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { MdRemoveRedEye, MdStarRate } from 'react-icons/md';
import { ImHeart, ImHeartBroken } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { LevelWithUserDB } from '../../../types/database-aliases';
import Tooltip from '../../../mui/components/Tooltip';

type Props = {
	level: LevelWithUserDB;
};
const LevelCard = ({ level }: Props) => {
	const navigate = useNavigate();
	const levelDate = new Date(level.created_at || '').toLocaleDateString().slice(0, 10);
	const karma = (level.likes || 0) - (level.dislikes || 0);
	const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

	return (
		<Slide in={true}>
			<Card sx={{ border: '1px solid', borderColor: blueGrey[50] }} elevation={0}>
				<CardActionArea onClick={() => navigate(`/level/${level.id}`)}>
					<Stack padding={2} gap={2} display="flex" justifyContent="space-between" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Avatar alt={level.user.nickname} src={level.user.avatarURL || ''} sx={{ width: 42, height: 42 }}>
								{level.user.nickname[0] || ''}
							</Avatar>
							<Stack>
								<Typography variant="h6" fontSize="1rem" color={blueGrey[900]}>
									{level.title}
								</Typography>

								<Typography variant="body2" fontSize="0.75rem" color={grey[500]}>
									{`${level.user.nickname} | ${levelDate}`}
								</Typography>
								<Tooltip title="Your score">
									<Stack direction="row" marginTop={0.5} color={blueGrey[100]}>
										<MdStarRate />
										<MdStarRate />
										<MdStarRate />
										<MdStarRate />
										<MdStarRate />
									</Stack>
								</Tooltip>
							</Stack>
						</Stack>
						<Stack
							gap={1.5}
							alignItems="flex-end"
							color={blueGrey[500]}
							borderTop="solid"
							borderColor={blueGrey[50]}
							sx={{
								flexDirection: { xs: 'row', sm: 'column' },
								justifyContent: { xs: 'left', sm: 'center' },
								borderTopWidth: { xs: '1px', sm: '0px' },
								paddingTop: { xs: 2, sm: 0 },
							}}
						>
							<Tooltip title="Karma">
								<Stack direction="row" alignItems="center" spacing={0.6}>
									{karma >= 0 ? <ImHeart color={red[400]} /> : <ImHeartBroken color={blueGrey[900]} />}
									<Typography fontSize="0.75rem">{numberFormatter.format(karma)}</Typography>
								</Stack>
							</Tooltip>
							<Tooltip title="Times played">
								<Stack direction="row" alignItems="center" spacing={0.6}>
									<MdRemoveRedEye />
									<Typography fontSize="0.75rem">{numberFormatter.format(349)}</Typography>
								</Stack>
							</Tooltip>
						</Stack>
					</Stack>
				</CardActionArea>
			</Card>
		</Slide>
	);
};

export default LevelCard;
