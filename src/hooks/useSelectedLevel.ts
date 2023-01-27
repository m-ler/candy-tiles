import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { getLevel } from '../api/levels';
import { selectedLevelState } from '../store/selectedLevel';

const DEFAULT_LEVEL = '0';

export default (selectedLevelId?: string) => {
	const idRef = useRef<string>(DEFAULT_LEVEL);
	idRef.current = selectedLevelId ? selectedLevelId : idRef.current;
	const setSelectedLevel = useSetRecoilState(selectedLevelState);

	return useQuery(['selected-level'], () => getLevel(idRef.current), {
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		retry: 1,
		onSuccess: (data) => setSelectedLevel(structuredClone(data) as LevelData),
	});
};
