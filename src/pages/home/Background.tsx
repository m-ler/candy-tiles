import backgroundImg from './../../assets/img/illustrations/home-bg.jpg';
import clouds from './../../assets/svg/clouds.svg';

const Background = () => {
	return (
		<>
			<div
				className="absolute w-screen h-screen top-0 left-0 z-[-10]"
				style={{
					background: `rgba(0,0,0,0.5) url(${backgroundImg})`,
					backgroundBlendMode: 'darken',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
					backdropFilter: 'opacity(0.8)',
				}}
			></div>
			<div
				className="absolute w-screen h-screen top-0 left-0 z-[-9]"
				style={{
					background: 'linear-gradient(to top, #A38946 10%, transparent)',
				}}
			></div>
			<div
				className="absolute w-screen h-full bottom-0 left-0 z-[-8]"
				style={{
					background: `url(${clouds})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'bottom',
					backgroundSize: 'cover',
					opacity: '0.5',
				}}
			></div>
		</>
	);
};

export default Background;
