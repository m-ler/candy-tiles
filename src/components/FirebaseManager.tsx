import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useSetRecoilState } from 'recoil';
import { loggedUserState } from './../store/loggedUser';

const FirebaseManager = () => {
	const setLoggedUser = useSetRecoilState(loggedUserState);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setLoggedUser(user);
			/* auth.onIdTokenChanged((user) => {
				setLoggedUser(user);
			}); */
		});
	}, []);

	return <></>;
};

export default FirebaseManager;
