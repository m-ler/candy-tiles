import LevelSelector from "./level-selector";


const GamePage: React.FC = () => {
  return (
    <section className="w-screen m-auto 1200px] border border-white h-screen flex p-[20px]">
      <LevelSelector></LevelSelector>
    </section>
  );
};

export default GamePage;