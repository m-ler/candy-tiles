import { useRef } from 'react';
import { useQuery } from 'react-query';
import { getLevel } from '../api/levels';

const DEFAULT_LEVEL = '0';

export default (selectedLevelId?: string) => {
	const idRef = useRef<string>(DEFAULT_LEVEL);
	idRef.current = selectedLevelId ? selectedLevelId : idRef.current;

	return useQuery(['selected-level'], () => getLevel(idRef.current), {
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		retry: 1,
	});
};
