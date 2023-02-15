import { DialogContent, DialogTitle, Slide, Slider } from '@mui/material';
import { showVolumeDialogState } from './store/showVolumeDialog';
import { useRecoilState } from 'recoil';
import { MdVolumeDown, MdVolumeUp } from 'react-icons/md';
import { gameVolumeState } from './../../store/gameVolume';
import { useMemo, forwardRef } from 'react';
import Dialog from '../../components/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const VolumeDialog = () => {
	const [showVolumeDialog, setShowVolumeDialog] = useRecoilState(showVolumeDialogState);
	const [gameVolume, setGameVolume] = useRecoilState(gameVolumeState);
	const handleClose = () => setShowVolumeDialog(false);
	const initialValue = useMemo(() => Math.floor(gameVolume * 100), [showVolumeDialog]);

	const handleSliderChange = (e: Event, newValue: number | number[]) => setGameVolume((newValue as number) / 100);
	
	return (
		<Dialog open={showVolumeDialog} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
			<DialogTitle>Volume</DialogTitle>
			<DialogContent sx={{ overflow: 'visible' }}>
				<div className="flex gap-x-[16px] items-center mt-[12px]">
					<MdVolumeDown size={24} className="min-w-[24px]"></MdVolumeDown>
					<Slider
						key={showVolumeDialog.toString()}
						min={0}
						max={100}
						defaultValue={initialValue}
						onChange={handleSliderChange}
						valueLabelDisplay="auto"
					></Slider>
					<MdVolumeUp size={24} className="min-w-[24px]"></MdVolumeUp>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default VolumeDialog;
