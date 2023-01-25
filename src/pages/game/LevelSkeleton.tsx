import { Skeleton } from '@mui/material';

const LevelSkeleton = () => {
	return (
		<div className="w-[min(860px,100%)] m-auto h-[660px] flex gap-[20px] items-center">
			<div className="flex flex-col gap-y-[15px] w-[180px] h-[450px]">
				<Skeleton variant="rounded" width={'100%'} height={'15%'} />
				<Skeleton variant="rounded" width={'100%'} height={'85%'} />
			</div>

			<Skeleton variant="rounded" height={'100%'} className="grow" />
		</div>
	);
};

export default LevelSkeleton;
