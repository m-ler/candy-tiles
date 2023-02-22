import { useMutation } from 'react-query';
import { logOut } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default () => {
	const navigate = useNavigate();
	
	const logOutMutation = useMutation('logOut', logOut, {
		onSuccess: () => navigate(0),
	});
	return logOutMutation;
};
