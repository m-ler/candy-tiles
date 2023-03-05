import { Avatar, Box, Card, CardActionArea, Slide, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LevelWithUserDB } from '../../../types/database-aliases';

type Props = {
	level: LevelWithUserDB;
};
const LevelCard = ({ level }: Props) => {
	const navigate = useNavigate();

	return (
		<Slide in={true}>
			<Card>
				<CardActionArea onClick={() => navigate(`/level/${level.id}`)}>
					<Box padding={2} display="flex" justifyContent="space-between">
						<Typography variant="h6">{`${level.title}`}</Typography>
						<Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
							<Avatar alt={level.user.nickname} src={level.user.avatarURL || ''}>
								{level.user.nickname[0] || ''}
							</Avatar>
							<Typography variant="body2">{level.user.nickname}</Typography>
						</Box>
					</Box>
				</CardActionArea>
			</Card>
		</Slide>
	);
};

export default LevelCard;
