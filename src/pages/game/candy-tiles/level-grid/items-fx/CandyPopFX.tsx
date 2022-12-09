const hexColors: { [key: string]: string } = {
	'Red': 'border-[#ff2445]',
	'Orange': 'border-[#ff670f]',
	'Yellow': 'border-[#ffbf0f]',
	'Green': 'border-[#16f74f]',
	'Blue': 'border-[#1670f7]',
	'Purple': 'border-[#7b16f7]',
};

type CandyPopFXProps = {
	candyColor: string;
};

const CandyPopFX = ({ candyColor }: CandyPopFXProps) => {
	return (
		<span
			className={`block absolute top-0 left-0 right-0 bottom-0 rounded-full animate-[candyPopFX_.3s] opacity-[0] scale-0 border-[1vw] ${hexColors[candyColor]}`}
		></span>
	);
};

export default CandyPopFX;
