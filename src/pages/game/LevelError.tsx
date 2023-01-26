import { ReactComponent as Level404Illustration } from './../../assets/svg/level-404-illustration.svg';

const LevelError = () => {
	return (
		<section className="w-[min(100%,1000px)] flex flex-col m-auto relative items-center">
			<Level404Illustration className="w-[min(100%,400px)] h-full" style={{ shapeRendering: 'crispEdges' }}></Level404Illustration>
			<h3 className="w-full font-YellowCandy text-p-light text-[48px] text-center leading-[40px] mt-[30px]">
				Oops...! Something went wrong
			</h3>
			<h3 className="w-full font-YellowCandy text-s-main text-[20px] text-center leading-[20px] mt-[20px]">
				Sorry, we were unable to obtain the requested level. This may be due to a problem with the internet connection or the level not being
				available. Please try again.
			</h3>
		</section>
	);
};

export default LevelError;
