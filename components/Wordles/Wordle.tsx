interface WordleProps {
  guessCount: number;
  hardMode: boolean;
  wordleBoard: string[];
  wordleNumber: number;
  word: string;
  username?: string;
}
const Wordle = ({
  guessCount,
  hardMode,
  wordleBoard,
  wordleNumber,
  word,
  username,
}: WordleProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-2 py-3 relative w-64 break-inside ">
      <div className="flex flex-wrap ">
        <div className="w-full">
          {username && <p className="text-sm text-gray-600">{username}</p>}
          <div className="text-xl font-bold">Wordle {wordleNumber}</div>
          <p className="font-medium text-slate-400">{word}</p>
        </div>
      </div>
      <div className="absolute top-3 right-4">
        <p className="text-sm font-medium text-slate-400">
          {guessCount}/6 <span className="absolute">{hardMode ? "*" : ""}</span>
        </p>
      </div>

      <div className="text-center">
        {wordleBoard &&
          wordleBoard.map((row: string, index: any) => (
            <div key={Math.random()}>{row}</div>
          ))}
      </div>
    </div>
  );
};

export default Wordle;
