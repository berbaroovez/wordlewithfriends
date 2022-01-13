import { useState } from "react";
import { checkWord } from "../../util/supabase";
import { useAuth } from "../../util/auth";
import { useRouter } from "next/router";
import {
  colorBlindToColor,
  colorToColorBlind,
  whiteToBlack,
} from "../../util/functions";
const ShareCodeInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [word, setWord] = useState("");
  const [error, setError] = useState<string | null>("");
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //     const tetVar = `Wordle 205 5/6

    // ⬛⬛🟨⬛⬛
    // ⬛🟨🟨⬛🟩
    // 🟨⬛⬛🟨🟨
    // 🟨⬛⬛⬛🟨
    // 🟩🟩🟩🟩🟩`;

    const firstSplit = inputValue.split(" ", 3);
    const secondSplit = firstSplit[2].split("\n", 8);
    const numbers = secondSplit[0].split("/");

    //parse info
    // setScore(parseInt(numbers[0]));
    // console.log(firstSplit);

    const wordleNumber = parseInt(firstSplit[1]);

    var score: number | string = numbers[0];
    if (score.toLowerCase() === "x") {
      score = "0";
    }
    score = parseInt(score);
    // const score = parseInt(numbers[0]);
    const hardMode = secondSplit[0].includes("*");
    const board = secondSplit.slice(2);

    console.log(board);
    // const newBoard = colorBlindToColor(board);
    const colorBlindToDefaultBoard = colorBlindToColor(board);
    const lightModeBoardToDarkModeBoard = whiteToBlack(
      colorBlindToDefaultBoard
    );
    console.log(lightModeBoardToDarkModeBoard);
    const response = await checkWord({
      wordleNumber,
      word,
      guessCount: score,
      hardMode,
      userId: user.id,
      wordleBoard: lightModeBoardToDarkModeBoard,
    });

    if (response.error === true) {
      if (response.message) {
        setError(response.message);
      }
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="correct-word"
            className="block text-sm font-medium text-gray-700"
          >
            Correct Word
          </label>
          <div className="mt-1">
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              id="correct-word"
              name="correct-word"
              type="text"
              required
              maxLength={5}
              className="px-4 py-2 bg-slate-200 rounded"
            />
          </div>
        </div>

        <div className="share-code-text-area">
          <label
            htmlFor="share-code"
            className="block text-sm font-medium text-gray-700"
          >
            Paste Share Code
          </label>
          <div className="mt-1">
            <textarea
              id="share-code"
              name="share-code"
              rows={8}
              cols={15}
              value={inputValue}
              className="bg-slate-200 rounded p-2"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            submit
          </button>
        </div>

        <div className="text-red-500 block text-sm font-medium">
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ShareCodeInput;
