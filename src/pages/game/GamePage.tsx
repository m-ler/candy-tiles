import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import useSelectedLevel from '../../hooks/useSelectedLevel';
import CandyTiles from './candy-tiles';
import LevelError from './LevelError';
import LevelSkeleton from './LevelSkeleton';
import VolumeDialog from './VolumeDialog';
import { useRecoilValue } from 'recoil';
import { completedLevelsState } from '../../store/completedLevels';
import useToast from '../../hooks/useToast';
import Header from '../../components/header';
import { incrementOnlineLevelTimesPlayed } from '../../api/levels';

type Props = {
	isMainLevel?: boolean;
};

const GamePage = ({ isMainLevel }: Props) => {
	const createToast = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const selectedLevelId = useParams()['levelId'] || '';
	const selectedLevelQuery = useSelectedLevel(!!isMainLevel, selectedLevelId);
	const completedLevels = useRecoilValue(completedLevelsState);
	let levelAvaliable = true;

	useEffect(() => {
		return () => {
			queryClient.removeQueries(['selected-level']);
		};
	}, []);

	useEffect(() => {
		selectedLevelQuery.data && !selectedLevelQuery.data?.isMainLevel && incrementOnlineLevelTimesPlayed(parseInt(selectedLevelId));
	}, [selectedLevelQuery.data]);

	useEffect(() => {
		!!selectedLevelQuery.data && checkLevelAvailability();
	});

	const checkLevelAvailability = () => {
		const levelId = selectedLevelQuery.data?.file.id;
		const levelLocked = !completedLevels.main.some((x) => x.id === (levelId || 0) - 1);
		levelAvaliable = !isMainLevel || !levelLocked || levelId === 1;

		if (levelAvaliable) return;
		createToast({ message: 'Level locked', severity: 'error', durationMs: 3000 });
		navigate('/levels');
	};

	if (selectedLevelQuery.isLoading || selectedLevelQuery.isIdle) return <LevelSkeleton></LevelSkeleton>;
	if (selectedLevelQuery.error) return <LevelError></LevelError>;

	return (
		<>
			<Header />
			<section id="game-container" className="w-[min(1600px,100%)] m-auto flex gap-x-[15px] md:h-full">
				<CandyTiles></CandyTiles>
				<VolumeDialog></VolumeDialog>
			</section>
		</>
	);
};

export default GamePage;
