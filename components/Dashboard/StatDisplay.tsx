import StatBox from "./StatBox";

interface StatDisplayProps {
  worseWord: string;
  wordsUnderThree: number;
  currentStreak: number;
}

const StatDisplay = ({
  worseWord,
  wordsUnderThree,
  currentStreak,
}: StatDisplayProps) => {
  return (
    <div className="w-100 mb-4">
      <h1 className="font-bold text-xl text-center mb-4 md:text-left">Stats</h1>
      <div className="flex flex-wrap gap-5  justify-center md:justify-start ">
        <StatBox title={"worse word"} stat={worseWord} />
        <StatBox title={"under 3 guesses"} stat={wordsUnderThree} />
        <StatBox title={"current streak"} stat={currentStreak} />
      </div>
    </div>
  );
};

export default StatDisplay;
