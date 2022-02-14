import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Wordle from "../components/Wordles/Wordle";
import { useAuth } from "../util/auth";
import { getUsersSubmissions, GetUserSubmissionsType } from "../util/supabase";
import StatDisplay from "./../components/Dashboard/StatDisplay";

interface State {
  worstWord: string;
  wordsUnderThree: number;
  streak: number;
}

type Action =
  | { type: "setWorstWord"; worstWord: string }
  | { type: "setWordsUnderThree"; wordsUnderThree: number }
  | { type: "setStreak"; streak: number }
  | {
      type: "setAll";
      worstWord: string;
      wordsUnderThree: number;
      streak: number;
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setWorstWord":
      return { ...state, worstWord: action.worstWord };
    case "setWordsUnderThree":
      return { ...state, wordsUnderThree: action.wordsUnderThree };
    case "setStreak":
      return { ...state, streak: action.streak };

    case "setAll":
      return { ...state, ...action };
    default:
      return state;
  }
};

const Dashboard = () => {
  const { user, signIn } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [state, dispatch] = useReducer(reducer, {
    worstWord: "",
    wordsUnderThree: 0,
    streak: 0,
  });

  const calculateStats = (submissionArray: GetUserSubmissionsType[]) => {
    const worseWord = {
      word: "",
      guesses: -1,
    };
    var underThreeCount = 0;
    var streak = 0;

    for (var i = 0; i < submissionArray.length; i++) {
      if (submissionArray[i].guess_count === 0) {
        worseWord.word = submissionArray[i].words.word;
        worseWord.guesses = submissionArray[i].guess_count!;
        break;
      }

      if (submissionArray[i].guess_count! > worseWord.guesses) {
        worseWord.word = submissionArray[i].words.word;
        worseWord.guesses = submissionArray[i].guess_count!;
      }
    }

    for (var i = 0; i < submissionArray.length; i++) {
      if (
        submissionArray[i].guess_count! <= 3 &&
        submissionArray[i].guess_count! > 0
      ) {
        underThreeCount++;
      }
    }

    for (var i = 0; i < submissionArray.length; i++) {
      if (submissionArray[i].guess_count != 0) {
        streak++;
      } else {
        break;
      }
    }

    dispatch({
      type: "setAll",
      worstWord: worseWord.word,
      wordsUnderThree: underThreeCount,
      streak,
    });
  };
  useEffect(() => {
    const getSubmissions = async () => {
      if (user) {
        const response = await getUsersSubmissions(user.id);
        if (response.error === false) {
          if (Array.isArray(response.message)) {
            setSubmissions(response.message);
            calculateStats(response.message);
          }
        }
      }
    };
    getSubmissions();
  }, [user]);

  if (!user) {
    return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="font-bold text-2xl text-center">
          Hey idiot sign in!!!!!!
        </h1>
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={signIn}
        >
          Login with Discord
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-3xl ">
        <div className="flex flex-row  justify-center items-center md:justify-start">
          <Link href="/submit">
            <button className="w-40 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
              Submit Wordle
            </button>
          </Link>
        </div>
        {submissions && (
          <>
            {state && (
              <StatDisplay
                worseWord={state.worstWord}
                wordsUnderThree={state.wordsUnderThree}
                currentStreak={state.streak}
              />
            )}

            <div className="grid grid-flow-row justify-items-center md:grid-flow-col md:justify-between mb-4">
              <h1 className="font-bold text-2xl">Your Submissions</h1>
            </div>

            <div className="flex flex-wrap  gap-4 justify-center md:justify-start">
              {submissions.map((submission) => (
                // <div className="w-full sm:w-1/2 px-2">
                <Wordle
                  key={submission.id}
                  // id={submission.id}
                  wordleNumber={submission.words.wordle_number}
                  guessCount={submission.guess_count}
                  word={submission.words.word}
                  hardMode={submission.hard_mode}
                  wordleBoard={submission.wordle_board}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
