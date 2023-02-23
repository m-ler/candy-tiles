import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useSetRecoilState } from 'recoil';
import { loggedUserState } from './../store/loggedUser';

const getLoggedUserObj = (user: User | null): LoggedUserData | null =>
	!!user
		? ({
				uid: user.uid,
				email: user.email,
				nickname: user.displayName,
				firstLetter: (user.displayName || ' ')[0].toUpperCase(),
				avatarURL: user.photoURL || null,
				latestUpdateTime: Date.now(),
		  } as LoggedUserData)
		: null;

const FirebaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setLoggedUser(getLoggedUserObj(user));
			auth.onIdTokenChanged((user) => {
				setLoggedUser(getLoggedUserObj(user));
			});
		});
	}, []);

	return <></>;
};

export default FirebaseManager;
