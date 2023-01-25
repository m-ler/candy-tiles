import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import useSelectedLevel from '../../hooks/useSelectedLevel';
import CandyTiles from './candy-tiles';
import LevelError from './LevelError';
import LevelSkeleton from './LevelSkeleton';

const GamePage = () => {
	const queryClient = useQueryClient();
	const selectedLevelId = useParams()['levelId'] || '';
	const selectedLevelQuery = useSelectedLevel(selectedLevelId);

	useEffect(() => {
		return () => {
			queryClient.removeQueries(['selected-level']);
		};
	}, []);

	if (selectedLevelQuery.isLoading || selectedLevelQuery.isIdle) return <LevelSkeleton></LevelSkeleton>;
	if (selectedLevelQuery.error) return <LevelError></LevelError>;

	return (
		<section id="game-container" className="w-[min(1600px,100%)] m-auto flex p-[20px] gap-x-[15px]">
			<CandyTiles></CandyTiles>
		</section>
	);
};

export default GamePage;
