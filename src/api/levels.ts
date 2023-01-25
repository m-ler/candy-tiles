import { getRequest } from '../utils/fetch-request';

export const getLevel = (levelId: string, userId?: string): Promise<LevelData> => {
	const userLevel = !!userId;
	const url = userLevel ? '' : `/levels/${levelId}.json`;
	return getRequest<LevelData>(url);
};
