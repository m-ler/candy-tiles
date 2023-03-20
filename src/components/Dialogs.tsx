import useLoggedUser from '../hooks/useLoggedUser';
import DeleteAccountDialog from './delete-account-dialog';
import ManageUserDialog from './manage-user-dialog';
import UserAuthDialog from './UserAuthDialog';

const Dialogs = () => {
	const loggedUser = useLoggedUser();

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
