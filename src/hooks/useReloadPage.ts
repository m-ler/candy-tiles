import { useNavigate } from 'react-router-dom';

export default (): (() => void) => {
	const navigate = useNavigate();

	return () => {
		navigate(0);
	};
};
