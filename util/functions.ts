import { CombinedDataType } from "../types/custom";
import { GetUserSubmissionsType } from "./supabase";

interface averageObject {
  users: string;
  points: number[];
  average: string | number;
}

const colorBlindToColor = (board: string[]) => {
  // loop through an array of strings and replace the 🟦 with 🟨 and the 🟧 with 🟩
  return board.map((row: string) => {
    return row.replace(/🟦/g, "🟨").replace(/🟧/g, "🟩");
  });
};

const colorToColorBlind = (board: string[]) => {
  // loop through an array of strings and replace the 🟨 with 🟦 and the 🟩 with 🟧
  return board.map((row: string) => {
    return row.replace(/🟨/g, "🟦").replace(/🟩/g, "🟧");
  });
};

const whiteToBlack = (board: string[]) => {
  // loop through an array of strings and replace the ⬜ with ⬛
  return board.map((row: string) => {
    return row.replace(/⬜/g, "⬛");
  });
};

const calculateFails = (submissionArray: GetUserSubmissionsType[]) => {
  let count = 0;

  for (let i = 0; i < submissionArray.length; i++) {
    if (submissionArray[i].guess_count === 0) {
      count++;
    }
  }

  return count;
};

const calculateWordsInUnderThreeGuesses = (
  submissionArray: GetUserSubmissionsType[]
) => {
  let count = 0;

  for (let i = 0; i < submissionArray.length; i++) {
    if (
      submissionArray[i].guess_count! <= 3 &&
      submissionArray[i].guess_count! > 0
    ) {
      count++;
    }
  }

  return count;
};

const calculateCurrentStreak = (submissionArray: GetUserSubmissionsType[]) => {
  let streak = 0;

  for (var i = 0; i < submissionArray.length; i++) {
    if (submissionArray[i].guess_count != 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

const calculateTotalPoints = (inputArray: GetUserSubmissionsType[]) => {
  let total = 0;
  for (let i = 0; i < inputArray.length; i++) {
    total += guessToPoints(inputArray[i].guess_count!);
  }
  return total;
};

const calculateAverage = (inputArray: GetUserSubmissionsType[]) => {
  let total = 0;
  let avg: string | number = 0;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].guess_count === 0) {
      total += 7;
    } else {
      total += inputArray[i].guess_count!;
    }

    avg = (total / inputArray.length).toFixed(2);
  }
  return avg;
};

const guessToPoints = (guess: number) => {
  switch (guess) {
    case 1:
      return 6;
    case 2:
      return 5;
    case 3:
      return 4;
    case 4:
      return 3;
    case 5:
      return 2;
    case 6:
      return 1;
    case 0:
      return 0;
    default:
      return 0;
  }
};

//a function that takes in two GetUserSubmissionsType arrays and combines them where the wordleNumber is the same
const combineData = (
  loggedInUserArray: GetUserSubmissionsType[],
  selectedUserArray: GetUserSubmissionsType[]
) => {
  // console.log("insideCombineData", loggedInUserArray, selectedUserArray);
  let combinedData: CombinedDataType[] = [];
  console.log("Combing data......", loggedInUserArray);
  for (let i = 0; i < loggedInUserArray.length; i++) {
    for (let j = 0; j < selectedUserArray.length; j++) {
      if (
        loggedInUserArray[i].words.wordle_number ===
        selectedUserArray[j].words.wordle_number
      ) {
        console.log("Wordle Board", loggedInUserArray[i].wordle_board);
        combinedData.push({
          loggedInUser: loggedInUserArray[i],
          selectedUser: selectedUserArray[j],
        });
      }
    }
  }

  return combinedData;
};

export {
  colorBlindToColor,
  colorToColorBlind,
  whiteToBlack,
  calculateFails,
  calculateWordsInUnderThreeGuesses,
  calculateCurrentStreak,
  calculateTotalPoints,
  calculateAverage,
  combineData,
  guessToPoints,
};
