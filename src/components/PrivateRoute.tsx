import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedUserState } from './../store/loggedUser';

type Props = {
	allowAnonymousUsers: boolean;
	allowLoggedUsers: boolean;
	children: React.ReactNode;
};

const PrivateRoute = ({ allowAnonymousUsers, allowLoggedUsers, children }: Props) => {
	const currentUser = useRecoilValue(loggedUserState);
	const allow = allowLoggedUsers ? !!currentUser : allowAnonymousUsers ? currentUser === null : false;
	return <>{allow ? children : <Navigate to="/"></Navigate>}</>;
};

export default PrivateRoute;
