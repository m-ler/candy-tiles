import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useSetRecoilState } from 'recoil';
import { loggedUserState } from './../store/loggedUser';
import { useMutation } from 'react-query';
import { getUserDocumentById } from '../api/user';

const getLoggedUserObj = (user: UserDocument | null): LoggedUserData | null =>
	!!user
		? ({
				email: user.email,
				nickname: user.nickname,
				firstLetter: (user.nickname || ' ')[0].toUpperCase(),
				avatarURL: user.photoURL || null,
				latestUpdateTime: Date.now(),
		  } as LoggedUserData)
		: null;

const FirebaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);
	const userMutation = useMutation('user-mutation', () => getUserDocumentById(auth.currentUser?.uid || ''), {
		onSuccess: (data) => {
			setLoggedUser(getLoggedUserObj(data));
		},
	});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			userMutation.mutate();
			auth.onIdTokenChanged((user) => userMutation.mutate());
		});
	}, []);

	return <></>;
};

export default FirebaseManager;
