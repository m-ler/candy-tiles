import { AuthResponse, PostgrestSingleResponse, UserResponse } from '@supabase/supabase-js';
import { supabase } from '../config/supabase-config';
import { SignInData } from '../types';
import { deleteDirectory } from './storage';

export const createUser = async (email: string, nickname: string, password: string): Promise<PostgrestSingleResponse<null>> => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				nickname,
			},
		},
	});

	if (error) throw new Error('Something went wrong. Please try again');

	return supabase.from('users').insert({
		userId: data.user?.id || '',
		email,
		createdAt: data.user?.created_at,
		nickname,
		avatarURL: null,
		passedLevels: null,
		ratedLevels: null,
	});
};

export const signIn = async ({ email, password }: SignInData): Promise<AuthResponse> =>
	supabase.auth.signInWithPassword({
		email,
		password,
	});

export const logOut = async () => supabase.auth.signOut();

export const deleteUserAccount = async (userAuthId: string, email: string, password: string): Promise<UserResponse> => {
	const authResponse = await signIn({ email, password });
	if (authResponse.error) return authResponse;

	await supabase.from('users').delete().eq('userId', userAuthId);
	await deleteDirectory('media', userAuthId);

	const deleteResponse = await supabase.auth.admin.deleteUser(userAuthId);
	if (deleteResponse.error) return deleteResponse;

	return deleteResponse;
};

export const sendPaswordRecovery = async (email: string) =>
	supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${location.origin}/reset-password`,
	});

export const resetPassword = async (newPassword: string): Promise<UserResponse> => supabase.auth.updateUser({ password: newPassword });

export const refreshSession = async () => supabase.auth.refreshSession();
