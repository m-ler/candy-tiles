import { supabase } from '../config/supabase-config';

export const deleteDirectory = async (bucketName: string, dirPath: string) => {
	const { data: files, error } = await supabase.storage.from(bucketName).list(dirPath);
	if (error) return;

	await supabase.storage.from('media').remove(files.map((x) => `${dirPath}/${x.name}`));
	return supabase.storage.from(bucketName).remove([dirPath]);
};

export const checkFileExists = async (bucketName: string, filePath: string, fileName: string) => {
	const { data: files } = await supabase.storage.from(bucketName).list(filePath);
	return (files || []).some((x) => x.name === fileName);
};
