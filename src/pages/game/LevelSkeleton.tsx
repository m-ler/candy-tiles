import { Skeleton } from '@mui/material';

const LevelSkeleton = () => {
	return (
		<div className="w-[min(860px,100%)] m-auto md:my-0 h-[660px] flex md:flex-col gap-[20px] items-center">
			<div className="flex flex-col gap-y-[15px] w-[180px] h-[450px] md:min-h-[210px] md:max-h-[210px]">
				<Skeleton variant="rounded" width={'100%'} sx={{ height: { xs: '50%', md: '30%' } }} />
				<Skeleton variant="rounded" width={'100%'} sx={{ height: { xs: '50%', md: '70%' } }} />
			</div>

			<div className="grow w-full">
				<Skeleton variant="rounded" height={'100%'} className="w-full aspect-square" />
			</div>
		</div>
	);
};

export default LevelSkeleton;
