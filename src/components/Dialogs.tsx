import { useRecoilValue } from 'recoil';
import { loggedUserState } from '../store/loggedUser';
import DeleteAccountDialog from './delete-account-dialog';
import ManageUserDialog from './manage-user-dialog';
import UserAuthDialog from './UserAuthDialog';

const Dialogs = () => {
	const loggedUser = useRecoilValue(loggedUserState);

	return (
		<>
			<UserAuthDialog />
			{loggedUser && (
				<>
					<ManageUserDialog />
					<DeleteAccountDialog />
				</>
			)}
		</>
	);
};

export default Dialogs;
