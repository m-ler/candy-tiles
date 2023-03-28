import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { MdDeleteOutline, MdMoreVert } from 'react-icons/md';
import { LevelWithUserDB } from '../../../types/database-aliases';

type Props = {
	level: LevelWithUserDB;
	setLevel: (value: LevelWithUserDB | null) => void;
};

const LevelActions = ({ level, setLevel }: Props) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	return (
		<>
			<Stack alignItems="center" marginY="auto" marginLeft="auto">
				<IconButton data-cy="level-card-menu-button" edge="end" onClick={(e) => setAnchorEl(e.currentTarget)}>
					<MdMoreVert />
				</IconButton>
			</Stack>
			<Menu
				open={!!anchorEl}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
				transformOrigin={{ horizontal: 'right', vertical: 'center' }}
			>
				<MenuItem
					data-cy="delete-level-menu-button"
					onClick={() => {
						setAnchorEl(null);
						setLevel(level);
					}}
				>
					<ListItemIcon>
						<MdDeleteOutline size={20} />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default LevelActions;
