import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { getUserLevels } from '../../../api/levels';
import FetchErrorState from '../../../components/FetchErrorState';
import { supabase } from '../../../config/supabase-config';
import useLoggedUser from '../../../hooks/useLoggedUser';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from '../LevelCard';
import { myLevelsPageState } from '../store/myLevelsPage';
import DeleteLevelDialog from './DeleteLevelDialog';
import EmptyState from './EmptyState';
import LevelActions from './LevelActions';

const LEVELS_PER_PAGE = 5;
const MyLevelsTab = () => {
	const loggedUser = useLoggedUser();
	const [currentPage, setCurrentPage] = useRecoilState(myLevelsPageState);
	const myLevels = useMutation((page: number) => getUserLevels(page, LEVELS_PER_PAGE, loggedUser?.auth.id || ''));
	useEffect(() => {
		!!loggedUser && myLevels.mutate(currentPage);
		supabase.auth.onAuthStateChange((event) => {
			event === 'SIGNED_OUT' && setCurrentPage(1);
		});
	}, [currentPage, loggedUser?.auth.id]);

	const paginationCount = Math.ceil((myLevels.data?.count || 0) / LEVELS_PER_PAGE);
	const [deleteLevel, setDeleteLevel] = useState<LevelWithUserDB | null>(null);

	const noLevels = myLevels.data?.data?.length === 0;

	if (myLevels.error || myLevels.data?.error) return <FetchErrorState />;
	if (noLevels) return <EmptyState />;

	return (
		<>
			<Stack overflow="hidden" maxHeight="100%">
				<Stack spacing={1} padding={2} overflow="auto">
					{myLevels.isLoading && (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					)}
					{((myLevels.data?.data || []) as LevelWithUserDB[]).map((level) => (
						<LevelCard key={level.id} level={level} actions={<LevelActions level={level} setLevel={setDeleteLevel} />} />
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
			<DeleteLevelDialog level={deleteLevel} setLevel={setDeleteLevel} onLevelDeleted={() => myLevels.mutate(currentPage)} />
		</>
	);
};

export default MyLevelsTab;
