import { Navigate } from 'react-router-dom';
import useLoggedUser from '../hooks/useLoggedUser';

type Props = {
	allowAnonymousUsers: boolean;
	allowLoggedUsers: boolean;
	children: React.ReactNode;
};

const PrivateRoute = ({ allowAnonymousUsers, allowLoggedUsers, children }: Props) => {
	const loggedUser = useLoggedUser();
	const allow = allowLoggedUsers ? !!loggedUser : allowAnonymousUsers ? loggedUser === null : false;
	return <>{allow ? children : <Navigate to="/"></Navigate>}</>;
};

export default PrivateRoute;
