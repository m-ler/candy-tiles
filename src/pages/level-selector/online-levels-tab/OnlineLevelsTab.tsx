import { Box, CircularProgress, Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { getOnlineLevels } from '../../../api/levels';
import FetchErrorState from '../../../components/FetchErrorState';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from '../LevelCard';
import { onlineLevelsPageState } from '../store/onlineLevelsPage';
import EmptyState from './EmptyState';

const LEVELS_PER_PAGE = 25;

const OnlineLevelsTab = () => {
	const [currentPage, setCurrentPage] = useRecoilState(onlineLevelsPageState);
	const onlineLevels = useMutation((page: number) => getOnlineLevels(page, LEVELS_PER_PAGE));
	useEffect(() => {
		onlineLevels.mutate(currentPage);
	}, [currentPage]);

	const paginationCount = Math.ceil((onlineLevels.data?.count || 0) / LEVELS_PER_PAGE);

	const noLevels = onlineLevels.data?.data?.length === 0;

	if (onlineLevels.error || onlineLevels.data?.error) return <FetchErrorState />;
	if (noLevels) return <EmptyState />;

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

			<Box display="flex" padding={2}>
				<Pagination
					page={currentPage}
					onChange={(e, page) => setCurrentPage(page)}
					count={paginationCount}
					color="secondary"
					sx={{ margin: '0 auto' }}
				></Pagination>
			</Box>
		</Stack>
	);
};

export default OnlineLevelsTab;
