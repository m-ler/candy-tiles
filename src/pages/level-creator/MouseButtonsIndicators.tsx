import MouseLeftClick from '../../assets/svgr/MouseLeftClick';

const MouseButtonsIndicators = () => {
	return (
		<div className="fixed left-[50%] bottom-0 translate-x-[-50%] bg-p-dark rounded-tl-lg rounded-tr-lg px-[16px] py-[8px] flex gap-x-[16px] hover:opacity-50 duration-200">
			<div className="flex gap-x-[4px] items-center">
				<MouseLeftClick className="max-w-[18px] h-full text-p-light"></MouseLeftClick>
				<span className="text-[12px] text-p-light font-YellowCandy">Place</span>
			</div>

			<div className="flex gap-x-[4px] items-center">
				<MouseLeftClick className="max-w-[18px] h-full text-t-light scale-x-[-1]"></MouseLeftClick>
				<span className="text-[12px] text-t-light font-YellowCandy">Erase</span>
			</div>
		</div>
	);
};

export default MouseButtonsIndicators;
