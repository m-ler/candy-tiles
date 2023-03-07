import { supabase } from '../config/supabase-config';
import { getRequest } from '../utils/fetch-request';

export const getMainLevel = async (levelId: string) => {
	const mainLevelURL = `/levels/${levelId}.json`;
	return getRequest<LevelData>(mainLevelURL);
};

export const getOnlineLevel = async (levelId: string) => {
	const { data } = await supabase.from('level_files').select('file').eq('id', levelId);
	const file = data?.[0]?.file?.toString();
	if (!file) throw new Error('Level request failed');
	return JSON.parse(file) as LevelData;
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
			timesPlayed: 0,
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
