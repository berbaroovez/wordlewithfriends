import { useState } from "react";
import { useAuth } from "../../util/auth";
import { checkWord } from "../../util/supabase";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
const ManualInput = () => {
  const [wordleNumber, setWordleNumber] = useState(205);
  const [wordleWord, setWordleWord] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  const [error, setError] = useState<string | null>("");

  const { user, signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const response = await checkWord({
      wordleNumber,
      word: wordleWord,
      guessCount,
      hardMode,
      userId: user.id,
    });
    if (response.error === true) {
      setError(response.message);
    } else {
      setError(null);
      setWordleNumber(205);
      setWordleWord("");
      setGuessCount(0);
      setHardMode(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="wordle-number"
            className="block text-sm font-medium text-gray-700"
          >
            Wordle Number (ex: 205)
          </label>
          <div className="mt-1">
            <input
              onChange={(e) => setWordleNumber(parseInt(e.target.value))}
              value={wordleNumber}
              id="wordle-number"
              name="wordle-number"
              type="number"
              required
              min={205}
              className="px-4 py-2 bg-slate-200 rounded"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="correct-word"
            className="block text-sm font-medium text-gray-700"
          >
            Correct Word
          </label>
          <div className="mt-1">
            <input
              value={wordleWord}
              onChange={(e) => setWordleWord(e.target.value)}
              id="correct-word"
              name="correct-word"
              type="text"
              required
              maxLength={5}
              className="px-4 py-2 bg-slate-200 rounded"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="guess-count"
            className="block text-sm font-medium text-gray-700"
          >
            Guess Count
          </label>
          <div className="mt-1">
            <input
              value={guessCount}
              onChange={(e) => setGuessCount(parseInt(e.target.value))}
              id="guess-count"
              name="guess-count"
              type="number"
              required
              min={0}
              max={6}
              className="px-4 py-2 bg-slate-200 rounded"
            />
          </div>
          <p className="block text-xs font-medium text-gray-600 pt-2">
            Type in 0 if you got an &quot;X&quot;
          </p>
        </div>

        <div className="flex items-center">
          <input
            id="hard-mode"
            name="hard-mode"
            type="checkbox"
            className=""
            onChange={(e) => setHardMode(e.target.checked)}
          />
          <label
            htmlFor="hard-mode"
            className="ml-2 block text-sm text-gray-900"
          >
            Hard Mode?
          </label>
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

export default ManualInput;
