import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Wordle from "../components/Wordles/Wordle";
import { useAuth } from "../util/auth";
import { getUsersSubmissions, GetUserSubmissionsType } from "../util/supabase";
import StatDisplay from "./../components/Dashboard/StatDisplay";

enum ActionTypes {
  WORSE_WORD = "WORSE_WORD",
  WORDS_UNDER_THREE = "WORDS_UNDER_THREE",
  CURRENT_STREAK = "CURRENT_STREAK",
  UPDATE_ALL = "UPDATE_ALL",
}

type ActionOptions =
  | { type: ActionTypes.WORDS_UNDER_THREE; payload: number }
  | { type: ActionTypes.WORSE_WORD; payload: string }
  | { type: ActionTypes.CURRENT_STREAK; payload: number }
  | {
      type: ActionTypes.UPDATE_ALL;
      payload: {
        worseWord: string;
        wordsUnderThree: number;
        currentStreak: number;
      };
    };

interface StateProps {
  worseWord: string;
  wordsUnderThree: number;
  currentStreak: number;
}

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
  const initialState = {};
  const reducer = (state: StateProps, action: ActionOptions) => {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.WORDS_UNDER_THREE:
        return { ...state, wordsUnderThree: payload };

      case ActionTypes.WORSE_WORD:
        return { ...state, worseWord: payload };

      case ActionTypes.CURRENT_STREAK:
        return { ...state, currentStreak: payload };
      case ActionTypes.UPDATE_ALL:
        console.log("payload is type", typeof payload);
        //check if payload is an object
        if (typeof payload === "object") {
          return { ...state, ...payload };
        }
        return state;
      default:
        return state;
    }
  };
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, {
    worseWord: "",
    wordsUnderThree: 0,
    currentStreak: 0,
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
      type: ActionTypes.UPDATE_ALL,
      payload: {
        worseWord: worseWord.word,
        wordsUnderThree: underThreeCount,
        currentStreak: streak,
      },
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

      {submissions && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-3xl ">
          {state && (
            <StatDisplay
              worseWord={state.worseWord}
              wordsUnderThree={state.wordsUnderThree}
              currentStreak={state.currentStreak}
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
