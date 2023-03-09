import { Box, CircularProgress, Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getOnlineLevels } from '../../../api/levels';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from '../LevelCard';

const LEVELS_PER_PAGE = 5;

const OnlineLevelsTab = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const onlineLevels = useMutation((page: number) => getOnlineLevels(page, LEVELS_PER_PAGE));
	useEffect(() => {
		onlineLevels.mutate(currentPage);
	}, [currentPage]);

	const paginationCount = Math.ceil((onlineLevels.data?.count || 0) / LEVELS_PER_PAGE);

	return (
		<Stack overflow="hidden" maxHeight="100%">
			<Stack spacing={1} padding={2} overflow="auto">
				{onlineLevels.isLoading && (
					<Box display="flex" justifyContent="center">
						<CircularProgress />
					</Box>
				)}
				{((onlineLevels.data?.data || []) as LevelWithUserDB[]).map((level) => (
					<LevelCard key={level.id} level={level} />
				))}
			</Stack>
			{paginationCount > 1 && (
				<Box display="flex" padding={2}>
					<Pagination
						page={currentPage}
						onChange={(e, page) => setCurrentPage(page)}
						count={paginationCount}
						color="secondary"
						sx={{ margin: '0 auto' }}
					></Pagination>
				</Box>
			)}
		</Stack>
	);
};

export default OnlineLevelsTab;
