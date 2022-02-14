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
  combineData,
} from "../util/functions";
import { CombinedDataType } from "../types/custom";

// LIU = logged in user
// SU = selected user

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
  | { type: "incrementIndex" }
  | { type: "decrementIndex" }
  | { type: "setCombinedDataLength"; length: number }
  | { type: "setLIUHasSubmissions"; hasSubmissions: boolean }
  | { type: "setSUHasSubmissions"; hasSubmissions: boolean }
  | {
      type: "setUserInfo";
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
    }
  | { type: "reset" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setCombinedDataLength": {
      return { ...state, CombinedDataLength: action.length };
    }
    case "setLIUHasSubmissions": {
      return { ...state, LIUHasSubmissions: action.hasSubmissions };
    }
    case "setSUHasSubmissions": {
      return { ...state, SUHasSubmissions: action.hasSubmissions };
    }
    case "setUserInfo": {
      return {
        ...state,
        LIUAverageGuess: action.LIUAverageGuess,
        LIUWordInThree: action.LIUWordInThree,
        LIUFails: action.LIUFails,
        LIUStreak: action.LIUStreak,
        LIUTotalPoints: action.LIUTotalPoints,
        SUAverageGuess: action.SUAverageGuess,
        SUWordInThree: action.SUWordInThree,
        SUFails: action.SUFails,
        SUStreak: action.SUStreak,
        SUTotalPoints: action.SUTotalPoints,
      };
    }

    case "incrementIndex":
      if (state.ViewingIndex == state.CombinedDataLength - 1) {
        return { ...state, ViewingIndex: 0 };
      } else {
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

  //Pings supabase to get all the users and then we can set the userList
  // so we can display in the dropdown
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

  // when a user is selected from the dropdown we need to get the data for that user
  //we also reset the state for the page because we need to have new data for the user
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

  //once we have we have the data for both users we first combine the data into one array so only have matches where the user have th same wordles submitted
  // we then also set the states for each user
  useEffect(() => {
    if (selectedUserData && loggedInUserData) {
      const data = combineData(loggedInUserData, selectedUserData);
      setCombinedUserData(data);
      dispatch({ type: "setCombinedDataLength", length: data.length });
      dispatch({
        type: "setUserInfo",
        LIUAverageGuess: calculateAverage(loggedInUserData),
        LIUWordInThree: calculateWordsInUnderThreeGuesses(loggedInUserData),
        LIUFails: calculateFails(loggedInUserData),
        LIUStreak: calculateCurrentStreak(loggedInUserData),
        LIUTotalPoints: calculateTotalPoints(loggedInUserData),
        SUAverageGuess: calculateAverage(selectedUserData),
        SUWordInThree: calculateWordsInUnderThreeGuesses(selectedUserData),
        SUFails: calculateFails(selectedUserData),
        SUStreak: calculateCurrentStreak(selectedUserData),
        SUTotalPoints: calculateTotalPoints(selectedUserData),
      });
    }
  }, [selectedUserData, loggedInUserData]);

  //We grab the the logged in users data and set the state for the logged in user
  // we also check to make sure they've even made a submissiom before lol
  useEffect(() => {
    const getLoggedInUserData = async () => {
      if (user) {
        const data = await getUserData(user.id);
        if (data) {
          if (data.length > 0) {
            setLoggedInUserData(data);
            dispatch({ type: "setLIUHasSubmissions", hasSubmissions: true });
          }
        }
      }
    };
    getLoggedInUserData();
  }, [user]);

  // attempt at reducing repeat code for grabbing user data
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
            {!state.LIUHasSubmissions &&
              "You've never made a submission why are you here"}
            {!state.SUHasSubmissions &&
              "The selected user has made no submissions ever?"}
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
