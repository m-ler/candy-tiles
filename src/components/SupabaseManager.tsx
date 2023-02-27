import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { supabase } from '../config/supabase-config';
import { loggedUserState } from '../store/loggedUser';

const getLoggedUserObj = (session: Session | null): LoggedUserData | null =>
	!!session
		? ({
				email: session.user.email || '',
				avatarURL: '',
				firstLetter: (session.user.user_metadata.nickname || ' ')[0].toUpperCase(),
				latestUpdateTime: Date.now(),
				nickname: session.user.user_metadata.nickname,
		  } as LoggedUserData)
		: null;

const SupabaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);
	/* const userMutation = useMutation('user-mutation', () => getUserDocumentById(auth.currentUser?.uid || ''), {
		onSuccess: (data) => {
			setLoggedUser(setLoggedUser(data));
		},
	}); */

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(session);
			setLoggedUser(getLoggedUserObj(session));
		});

		const foo = async () => {
			const { data, error } = await supabase.from('users').select('email').eq('email', 'jesse@gmail.com');
			console.log(data);
			console.log(error);
		};

		foo();
	}, []);

	return <></>;
};

export default SupabaseManager;
