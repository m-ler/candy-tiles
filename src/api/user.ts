import { supabase } from './../config/supabase-config';
import { checkFileExists } from './storage';

export const getUserProfile = async (userId: string) => supabase.from('users').select('*').eq('userId', userId);
export const updateUser = async (userId: string, newData: object) => supabase.from('users').update(newData).eq('userId', userId);

export const uploadAvatar = async (file: File, userId: string) => {
	const fileExtension = file.type.split('/')[1];
	const fileName = `avatar.${fileExtension}`;
	const filePath = `${userId}/${fileName}`;
	const fileExists = await checkFileExists('media', userId, fileName);

	const { data, error } = fileExists
		? await supabase.storage.from('media').update(filePath, file)
		: await supabase.storage.from('media').upload(filePath, file);

	if (error) throw new Error('Could not upload file. Please try again.');

	const avatarURL = `${supabase.storage.from('media').getPublicUrl(data.path).data.publicUrl}?updated=${Date.now()}`;
	return supabase.from('users').update({ avatarURL }).eq('userId', userId);
};
