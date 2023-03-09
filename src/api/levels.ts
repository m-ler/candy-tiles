import { getPagination } from './../utils/pagination';
import { supabase } from '../config/supabase-config';
import { getRequest } from '../utils/fetch-request';

export const getMainLevel = async (levelId: string) => {
	const mainLevelURL = `/levels/${levelId}.json`;
	return getRequest<LevelData>(mainLevelURL);
};

export const getOnlineLevel = async (levelId: string) => {
	const { data } = await supabase.from('levels').select('*').eq('id', levelId);
	const file = data?.[0]?.file?.toString();
	if (!file) throw new Error('Level request failed');
	return JSON.parse(file) as LevelData;
};

export type UploadLevelData = {
	levelTitle: string;
	levelJson: string;
	userId: string;
};

export const uploadLevel = async (levelData: UploadLevelData) =>
	supabase.from('levels').insert({
		title: levelData.levelTitle,
		likes: 0,
		dislikes: 0,
		userId: levelData.userId,
		timesPlayed: 0,
		file: levelData.levelJson,
	});

export const getOnlineLevels = async (page: number, size: number) => {
	const { from, to } = getPagination(page, size - 1);
	return supabase
		.from('levels')
		.select(`id, created_at, userId, title, likes, dislikes, timesPlayed,user:userId ( * )`, { count: 'exact' })
		.order('created_at', { ascending: false })
		.range(from, to);
};

export const getUserLevels = async (page: number, size: number, userId: string) => {
	const { from, to } = getPagination(page, size - 1);
	return supabase
		.from('levels')
		.select(`id, created_at, userId, title, likes, dislikes, timesPlayed,user:userId ( * )`, { count: 'exact' })
		.order('created_at', { ascending: false })
		.range(from, to)
		.eq('userId', userId);
};

export const incrementOnlineLevelTimesPlayed = async (levelId: number) => supabase.rpc('increment_level_times_played', { row_id: levelId });

export const deleteLevel = async (levelId: number) => supabase.from('levels').delete().eq('id', levelId);
