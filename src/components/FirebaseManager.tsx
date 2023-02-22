import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useSetRecoilState } from 'recoil';
import { loggedUserState } from './../store/loggedUser';

const FirebaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const userCopy = JSON.parse(JSON.stringify(user));
			setLoggedUser(userCopy);
			/* auth.onIdTokenChanged((user) => {
				setLoggedUser(user);
			}); */
		});
	}, []);

	return <></>;
};

export default FirebaseManager;
