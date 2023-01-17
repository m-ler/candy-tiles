import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userInteractedWithDocumentState } from '../store/userInteractedWithDocument';

const UserInteractionDetection = () => {
	const setUserInteractedWithPage = useSetRecoilState(userInteractedWithDocumentState);

	const updateUserInteractiedWithPage = () => setUserInteractedWithPage(true);

	useEffect(() => {
		document.addEventListener('click', updateUserInteractiedWithPage);

		return () => {
			document.removeEventListener('click', updateUserInteractiedWithPage);
		};
	}, []);

	return <></>;
};

export default UserInteractionDetection;
