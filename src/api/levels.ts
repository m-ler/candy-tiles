import { supabase } from '../config/supabase-config';
import { getRequest } from '../utils/fetch-request';

export const getLevel = (levelId: string, userId?: string): Promise<LevelData> => {
	const userLevel = !!userId;
	const url = userLevel ? '' : `/levels/${levelId}.json`;
	return getRequest<LevelData>(url);
};

export type UploadLevelData = {
	levelTitle: string;
	levelJson: string;
	userId: string;
};

export const uploadLevel = async (levelData: UploadLevelData) => {
	const { data, error } = await supabase
		.from('levels')
		.insert({
			title: levelData.levelTitle,
			likes: 0,
			dislikes: 0,
			userId: levelData.userId,
		})
		.select();

	if (error) return;

	const levelId = data[0]?.id;
	return supabase.from('level_files').insert({ levelId, file: levelData.levelJson });
};

export const getOnlineLevels = async () =>
	supabase.from('levels').select(`
    *,
    user:userId ( * )
  `);
