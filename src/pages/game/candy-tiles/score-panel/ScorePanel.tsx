const ScorePanel: React.FC = () => {
	return (
		<div
			className="w-[200px] h-[80%] bg-purple rounded-lg border-[20px]" 
			style={{ borderImageSource: 'url("src/assets/borders/candy1.png")', borderImageSlice: '50', borderImageRepeat: 'round'}}
		></div>
	);
};

export default ScorePanel;
