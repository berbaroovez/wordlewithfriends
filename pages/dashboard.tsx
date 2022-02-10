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
  | { type: "setStreak"; streak: number };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setWorstWord":
      return { ...state, worstWord: action.worstWord };
    case "setWordsUnderThree":
      return { ...state, wordsUnderThree: action.wordsUnderThree };
    case "setStreak":
      return { ...state, streak: action.streak };
    default:
      return state;
  }
};

// type Visibility = "all" | "completed" | "active";
// interface State {
//   todos: {
//     id: number;
//     text: string;
//     completed: boolean;
//   }[];
//   visibility: Visibility;
// }
// type Action =
//   | { type: "add_todo"; id: number; text: string }
//   | { type: "toggle_todo"; id: number }
//   | { type: "set_visibility"; visibility: Visibility };

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "add_todo":
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           { id: action.id, text: action.text, completed: false },
//         ],
//       };
//     case "toggle_todo":
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
//         ),
//       };
//     case "set_visibility":
//       return {
//         ...state,
//         visibility: action.visibility,
//       };
//   }
// };

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

      {submissions && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-3xl ">
          {state && (
            <StatDisplay
              worseWord={"poop"}
              wordsUnderThree={0}
              currentStreak={0}
            />
          )}

          <div className="grid grid-flow-row justify-items-center md:grid-flow-col md:justify-between mb-4">
            <h1 className="font-bold text-2xl">Your Submissions</h1>
            <Link href="/submit">
              <button className="w-40 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Wordle
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap  gap-4 justify-center md:justify-start">
            {submissions.map((submission) => (
              // <div className="w-full sm:w-1/2 px-2">
              <Wordle
                key={submission.id}
                id={submission.id}
                wordleNumber={submission.words.wordle_number}
                guessCount={submission.guess_count}
                word={submission.words.word}
                hardMode={submission.hard_mode}
                wordleBoard={submission.wordle_board}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
