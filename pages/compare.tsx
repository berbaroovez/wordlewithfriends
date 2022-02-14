import { useAuth } from "../util/auth";
import Wordle from "../components/Wordles/Wordle";
import StatLine from "../components/Compare/StatLine";
import { useEffect, useReducer, useState } from "react";
import {
  getAllUsers,
  getUsersSubmissions,
  GetUserSubmissionsType,
} from "../util/supabase";
import { definitions } from "../types/supabase";
import SkeletonWordle from "../components/Wordles/SkeletonWordle";
import {
  calculateAverage,
  calculateCurrentStreak,
  calculateFails,
  calculateTotalPoints,
  calculateWordsInUnderThreeGuesses,
} from "../util/functions";

// LIU = logged in user
// SU = selected user

interface CombinedDataType {
  loggedInUser: GetUserSubmissionsType;
  selectedUser: GetUserSubmissionsType;
}

const initalState = {
  LIUAverageGuess: 0,
  LIUWordInThree: 0,
  LIUFails: 0,
  LIUStreak: 0,
  LIUTotalPoints: 0,
  SUAverageGuess: 0,
  SUWordInThree: 0,
  SUFails: 0,
  SUStreak: 0,
  SUTotalPoints: 0,
  ViewingIndex: 0,
  CombinedDataLength: 0,
  LIUHasSubmissions: false,
  SUHasSubmissions: false,
};

interface State {
  LIUAverageGuess: number | string;
  LIUWordInThree: number;
  LIUFails: number;
  LIUStreak: number;
  LIUTotalPoints: number;
  SUAverageGuess: number | string;
  SUWordInThree: number;
  SUFails: number;
  SUStreak: number;
  SUTotalPoints: number;
  ViewingIndex: number;
  CombinedDataLength: number;
  LIUHasSubmissions: boolean;
  SUHasSubmissions: boolean;
}

type Action =
  | { type: "setLIUAverageGuess"; averageGuess: number | string }
  | { type: "setLIUWordInThree"; wordInThree: number }
  | { type: "setLIUFails"; fails: number }
  | { type: "setLIUStreak"; streak: number }
  | { type: "setLIUTotalPoints"; totalPoints: number }
  | { type: "setSUAverageGuess"; averageGuess: number | string }
  | { type: "setSUWordInThree"; wordInThree: number }
  | { type: "setSUFails"; fails: number }
  | { type: "setSUStreak"; streak: number }
  | { type: "setSUTotalPoints"; totalPoints: number }
  | { type: "incrementIndex" }
  | { type: "decrementIndex" }
  | { type: "setCombinedDataLength"; length: number }
  | { type: "setLIUHasSubmissions"; hasSubmissions: boolean }
  | { type: "setSUHasSubmissions"; hasSubmissions: boolean }
  | { type: "reset" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setLIUAverageGuess":
      return { ...state, LIUAverageGuess: action.averageGuess };
    case "setLIUWordInThree":
      return { ...state, LIUWordInThree: action.wordInThree };
    case "setLIUFails":
      return { ...state, LIUFails: action.fails };
    case "setLIUStreak":
      return { ...state, LIUStreak: action.streak };
    case "setLIUTotalPoints":
      return { ...state, LIUTotalPoints: action.totalPoints };
    case "setSUAverageGuess":
      return { ...state, SUAverageGuess: action.averageGuess };
    case "setSUWordInThree":
      return { ...state, SUWordInThree: action.wordInThree };
    case "setSUFails":
      return { ...state, SUFails: action.fails };
    case "setSUStreak":
      return { ...state, SUStreak: action.streak };
    case "setSUTotalPoints":
      return { ...state, SUTotalPoints: action.totalPoints };
    case "setCombinedDataLength": {
      return { ...state, CombinedDataLength: action.length };
    }
    case "setLIUHasSubmissions": {
      return { ...state, LIUHasSubmissions: action.hasSubmissions };
    }
    case "setSUHasSubmissions": {
      return { ...state, SUHasSubmissions: action.hasSubmissions };
    }

    case "incrementIndex":
      console.log("incrementing");
      if (state.ViewingIndex == state.CombinedDataLength - 1) {
        console.log("close to end", state.ViewingIndex);
        return { ...state, ViewingIndex: 0 };
      } else {
        console.log("normal", state.ViewingIndex);
        return { ...state, ViewingIndex: state.ViewingIndex + 1 };
      }

    case "decrementIndex":
      //if index is 0, then set to last index
      if (state.ViewingIndex == 0) {
        return { ...state, ViewingIndex: state.CombinedDataLength - 1 };
      } else {
        return { ...state, ViewingIndex: state.ViewingIndex - 1 };
      }

    case "reset":
      const { LIUHasSubmissions, ...rest } = initalState;
      return { ...initalState, LIUHasSubmissions: state.LIUHasSubmissions };
    default:
      return state;
  }
};

const Compare = () => {
  const { user, signIn } = useAuth();
  const [userList, setUserList] = useState<definitions["users"][]>();
  const [loggedInUserData, setLoggedInUserData] =
    useState<GetUserSubmissionsType[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  const [selectedUserData, setSelectedUserData] =
    useState<GetUserSubmissionsType[]>();

  const [combinedUserData, setCombinedUserData] = useState<
    CombinedDataType[] | null
  >(null);

  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();

      if (response.error === false) {
        if (Array.isArray(response.message)) {
          setUserList(response.message);
          setSelectedUser(response.message[0].id);
        }
      }
    };
    getUsers();
  }, []);

  // grab data for seleced user
  useEffect(() => {
    const getSelectedUserData = async () => {
      if (selectedUser) {
        // reset the data between user choices
        dispatch({ type: "reset" });
        setCombinedUserData(null);
        const data = await getUserData(selectedUser);
        if (data) {
          if (data.length > 0) {
            console.log("selected suer", data);
            setSelectedUserData(data);
            dispatch({ type: "setSUHasSubmissions", hasSubmissions: true });
          }
        }
      }
    };
    getSelectedUserData();
  }, [selectedUser]);

  useEffect(() => {
    console.log("-----------------------------");
    console.log("selected user =====", selectedUser);
    console.log("SELECTED USER DATA", selectedUserData);
    console.log("loggedInUserData USER DATA", loggedInUserData);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    if (selectedUserData && loggedInUserData) {
      const data = combineData(selectedUserData, loggedInUserData);
      console.log("DATA", data);
      setCombinedUserData(data);
      dispatch({ type: "setCombinedDataLength", length: data.length });

      // set LIU data
      dispatch({
        type: "setLIUAverageGuess",
        averageGuess: calculateAverage(loggedInUserData),
      });
      dispatch({
        type: "setLIUWordInThree",
        wordInThree: calculateWordsInUnderThreeGuesses(loggedInUserData),
      });
      dispatch({
        type: "setLIUFails",
        fails: calculateFails(loggedInUserData),
      });
      dispatch({
        type: "setLIUStreak",
        streak: calculateCurrentStreak(loggedInUserData),
      });
      dispatch({
        type: "setLIUTotalPoints",
        totalPoints: calculateTotalPoints(loggedInUserData),
      });
      dispatch({
        type: "setSUAverageGuess",
        averageGuess: calculateAverage(selectedUserData),
      });
      dispatch({
        type: "setSUWordInThree",
        wordInThree: calculateWordsInUnderThreeGuesses(selectedUserData),
      });
      dispatch({
        type: "setSUFails",
        fails: calculateFails(selectedUserData),
      });
      dispatch({
        type: "setSUStreak",
        streak: calculateCurrentStreak(selectedUserData),
      });
      dispatch({
        type: "setSUTotalPoints",
        totalPoints: calculateTotalPoints(selectedUserData),
      });
    }
  }, [selectedUserData, loggedInUserData]);

  useEffect(() => {
    const getLoggedInUserData = async () => {
      if (user) {
        const data = await getUserData(user.id);
        if (data) {
          if (data.length > 0) {
            setLoggedInUserData(data);
            dispatch({ type: "setLIUHasSubmissions", hasSubmissions: true });
          }

          // console.log("logged in user data", data);
        }
      }
    };
    getLoggedInUserData();

    console.log(user);
  }, [user]);

  const getUserData = async (userID: string) => {
    const response = await getUsersSubmissions(userID);

    if (response.error === false) {
      if (response.message) {
        if (Array.isArray(response.message)) {
          return response.message;
        }
      }
    }
  };

  //a function that takes in two GetUserSubmissionsType arrays and combines them where the wordleNumber is the same
  const combineData = (
    loggedInUserArray: GetUserSubmissionsType[],
    selectedUserArray: GetUserSubmissionsType[]
  ) => {
    console.log("insideCombineData", loggedInUserArray, selectedUserArray);
    let combinedData: CombinedDataType[] = [];

    for (let i = 0; i < loggedInUserArray.length; i++) {
      for (let j = 0; j < selectedUserArray.length; j++) {
        if (
          loggedInUserArray[i].words.wordle_number ===
          selectedUserArray[j].words.wordle_number
        ) {
          combinedData.push({
            loggedInUser: loggedInUserArray[i],
            selectedUser: selectedUserArray[j],
          });
        }
      }
    }

    return combinedData;
  };

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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-4xl">
      <div className="flex justify-between">
        <div>
          <h3 className="p-2 border border-gray-400 rounded-md shadow-sm mb-4">
            {user.user_metadata.full_name}
          </h3>
          <div>
            {combinedUserData && combinedUserData.length > 0 ? (
              <Wordle
                key={
                  combinedUserData[state.ViewingIndex].loggedInUser.words
                    .wordle_number
                }
                guessCount={
                  combinedUserData[state.ViewingIndex].loggedInUser.guess_count!
                }
                hardMode={
                  combinedUserData[state.ViewingIndex].loggedInUser.hard_mode!
                }
                word={
                  combinedUserData[state.ViewingIndex].loggedInUser.words.word
                }
                wordleNumber={
                  combinedUserData[state.ViewingIndex].loggedInUser.words
                    .wordle_number
                }
                wordleBoard={
                  combinedUserData[state.ViewingIndex].loggedInUser.wordle_board
                }
              />
            ) : (
              <SkeletonWordle />
            )}
          </div>
        </div>
        <div className=" w-80">
          <div className="text-center text-3xl font-bold mb-4">Stats</div>

          <StatLine
            stat={"Avg Guess"}
            leftValue={state.LIUAverageGuess}
            rightValue={state.SUAverageGuess}
          />
          <StatLine
            stat={"Words Under Three"}
            leftValue={state.LIUWordInThree}
            rightValue={state.SUWordInThree}
          />
          <StatLine
            stat={"fails"}
            leftValue={state.LIUFails}
            rightValue={state.SUFails}
          />
          <StatLine
            stat={"streak"}
            leftValue={state.LIUStreak}
            rightValue={state.SUStreak}
          />
          <StatLine
            stat={"total points"}
            leftValue={state.LIUTotalPoints}
            rightValue={state.SUTotalPoints}
          />

          <div className="flex justify-around mt-12">
            <button
              className=" bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 border border-slate-300 rounded-md shadow-sm"
              onClick={() => dispatch({ type: "decrementIndex" })}
            >
              Previous
            </button>
            <button
              className=" bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 border border-slate-300 rounded-md shadow-sm"
              onClick={() => dispatch({ type: "incrementIndex" })}
            >
              Next
            </button>
          </div>
          <div className="text-red-600 font-bold text-l text-center">
            {combinedUserData?.length === 0 && "No matches between yall"}
          </div>
        </div>
        <div>
          <select
            className="p-2 border border-gray-400 rounded-md shadow-sm mb-4"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
            }}
          >
            {userList?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <div>
            {combinedUserData && combinedUserData.length > 0 ? (
              <Wordle
                key={
                  combinedUserData[state.ViewingIndex].selectedUser.words
                    .wordle_number
                }
                guessCount={
                  combinedUserData[state.ViewingIndex].selectedUser.guess_count!
                }
                hardMode={
                  combinedUserData[state.ViewingIndex].selectedUser.hard_mode!
                }
                word={
                  combinedUserData[state.ViewingIndex].selectedUser.words.word
                }
                wordleNumber={
                  combinedUserData[state.ViewingIndex].selectedUser.words
                    .wordle_number
                }
                wordleBoard={
                  combinedUserData[state.ViewingIndex].selectedUser.wordle_board
                }
              />
            ) : (
              <SkeletonWordle />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
