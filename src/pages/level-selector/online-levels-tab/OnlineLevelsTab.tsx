import { Box, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { getOnlineLevels } from '../../../api/levels';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from './LevelCard';

const OnlineLevelsTab = () => {
	const onlineLevelsMutation = useMutation(() => getOnlineLevels());
	useEffect(() => {
		onlineLevelsMutation.mutate();
	}, []);

	return (
		<Stack spacing={1} padding={2}>
			{onlineLevelsMutation.isLoading && (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			)}
			{((onlineLevelsMutation.data?.data || []) as LevelWithUserDB[]).map((level) => (
				<LevelCard key={level.id} level={level} />
			))}
		</Stack>
	);
};

export default OnlineLevelsTab;
