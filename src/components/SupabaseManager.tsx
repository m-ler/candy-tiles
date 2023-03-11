import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { getUserProfile } from '../api/user';
import { supabase } from '../config/supabase-config';
import { loggedUserState } from '../store/loggedUser';
import { UserDb } from '../types/database-aliases';
import { useNavigate } from 'react-router-dom';

const getLoggedUserObj = (profile: UserDb, session: Session | null): LoggedUserData | null =>
	session
		? ({
				auth: session.user,
				profile: {
					id: profile.id,
					uid: session.user.id,
					email: session.user.email || '',
					avatarURL: profile.avatarURL,
					firstLetter: (session.user.user_metadata.nickname || ' ')[0].toUpperCase(),
					latestUpdateTime: Date.now(),
					nickname: session.user.user_metadata.nickname,
					likedLevels: profile.likedLevels || [],
					dislikedLevels: profile.dislikedLevels || [],
				},
		  } as LoggedUserData)
		: null;

const SupabaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);
	const navigate = useNavigate();

	const userMutation = useMutation('user-mutation', (session: Session | null) => getUserProfile(session?.user.id || ''), {
		onSuccess: (data, session) => {
			setLoggedUser(getLoggedUserObj((data.data || [])[0], session));
		},
	});

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {			
			if (event === 'SIGNED_OUT') {
				setLoggedUser(null);
				navigate(0);
				return;
			}
			userMutation.mutate(session);
		});

		supabase.auth.refreshSession();
	}, []);

	return <></>;
};

export default SupabaseManager;
