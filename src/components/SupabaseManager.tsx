import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { getUserProfile } from '../api/user';
import { supabase } from '../config/supabase-config';
import { loggedUserState } from '../store/loggedUser';
import { UserDb } from '../types/database-aliases';
import { useNavigate } from 'react-router-dom';

const getLoggedUserObj = (profile: UserDb, session: Session | null): LoggedUserData | null =>
	!!session
		? ({
				uid: session.user.id,
				email: session.user.email || '',
				avatarURL: profile.avatarURL,
				firstLetter: (session.user.user_metadata.nickname || ' ')[0].toUpperCase(),
				latestUpdateTime: Date.now(),
				nickname: session.user.user_metadata.nickname,

				auth: session.user,
				profile: {
					uid: session.user.id,
					email: session.user.email || '',
					avatarURL: profile.avatarURL,
					firstLetter: (session.user.user_metadata.nickname || ' ')[0].toUpperCase(),
					latestUpdateTime: Date.now(),
					nickname: session.user.user_metadata.nickname,
				},
		  } as LoggedUserData)
		: null;

const SupabaseManager = () => {
	const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);
	const navigate = useNavigate();

	const userMutation = useMutation('user-mutation', (session: Session | null) => getUserProfile(session?.user.id || ''), {
		onSuccess: (data, session) => {
			const newSignIn = loggedUser === null;
			setLoggedUser(getLoggedUserObj((data.data || [])[0], session));
			newSignIn && navigate(0);
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
	}, []);

	return <></>;
};

export default SupabaseManager;
