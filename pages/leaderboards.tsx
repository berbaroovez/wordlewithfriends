import { useEffect, useState } from "react";
import { getAllSubmissions } from "../util/supabase";

const Leaderboards = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pointsLeaderBoard, setPointsLeaderBoard] = useState<any[]>([]);
  const [averageLeaderBoard, setAverageLeaderBoard] = useState<any[]>([]);
  useEffect(() => {
    const getSubmissions = async () => {
      const response = await getAllSubmissions();
      if (response.error === false) {
        if (Array.isArray(response.message)) {
          setSubmissions(response.message);
          setPointsLeaderBoard(calculateTotalPoints(response.message));
          setAverageLeaderBoard(calculateAverage(response.message));
        }
      }
    };
    getSubmissions();
  }, []);

  const calculateTotalPoints = (inputArray: any[]) => {
    const tempArray: any[] = [];
    const alreadyChecked: any[] = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (!alreadyChecked.includes(inputArray[i].users.id)) {
        alreadyChecked.push(inputArray[i].users.id);
        const tempObject = {
          users: inputArray[i].users.username,
          total_points: 0,
        };

        for (let j = i; j < inputArray.length; j++) {
          if (inputArray[i].users.id === inputArray[j].users.id) {
            // console.log("points", inputArray[j].);
            console.log(
              `${inputArray[i].users.username} ${inputArray[j].guess_count}`
            );

            tempObject.total_points += guessToPoints(inputArray[j].guess_count);
          }
        }
        tempArray.push(tempObject);
      }
    }
    return tempArray.sort((a, b) => b.total_points - a.total_points);
  };

  interface averageObject {
    users: string;
    points: number[];
    average: string | number;
  }
  const calculateAverage = (inputArray: any[]) => {
    console.log("INPUT ARRAY", inputArray);
    const tempArray: any[] = [];
    const alreadyChecked: any[] = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (!alreadyChecked.includes(inputArray[i].users.id)) {
        alreadyChecked.push(inputArray[i].users.id);

        //array of all the submissions for a user
        const tempObject: averageObject = {
          users: inputArray[i].users.username,
          points: [],
          average: 0,
        };

        for (let j = i; j < inputArray.length; j++) {
          if (inputArray[i].users.id === inputArray[j].users.id) {
            if (inputArray[j].guess_count === 0) {
              tempObject.points = [...tempObject.points, 7];
            } else {
              tempObject.points = [
                ...tempObject.points,
                inputArray[j].guess_count,
              ];
            }
          }
        }
        const avg =
          tempObject.points.reduce((a, b) => a + b, 0) /
          tempObject.points.length;
        tempObject.average = avg.toFixed(2);

        if (tempObject.points.length > 4) {
          tempArray.push(tempObject);
        }
      }
    }
    return tempArray.sort((a, b) => a.average - b.average);
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

  return (
    <div>
      <h1 className="text-center font-bold text-xl p-4">Leaderboards</h1>
      <button onClick={() => calculateTotalPoints(submissions)}></button>
      <div className="flex justify-center gap-8 flex-wrap ">
        {/* <div className="bg-red-400 w-28 h-28"></div>
        <div className="bg-red-400 w-28 h-28"></div> */}
        <table className="shadow-lg bg-white rounded-lg w-40 ">
          <thead className="">
            <tr>
              <th className="bg-blue-300 text-left px-8 py-4 rounded-tl-lg">
                Name
              </th>
              <th className="bg-blue-300  text-left px-8 py-4 rounded-tr-lg">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {pointsLeaderBoard.map((user: any) => (
              <tr key={user.users}>
                <td className="border px-8 py-4">{user.users}</td>
                <td className="border px-8 py-4">{user.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="shadow-lg bg-white rounded-lg w-40">
          <thead className="">
            <tr>
              <th className="bg-blue-300 text-left px-8 py-4 rounded-tl-lg">
                Name
              </th>
              <th className="bg-blue-300  text-left px-8 py-4 rounded-tr-lg">
                Average Guesses
              </th>
            </tr>
          </thead>
          <tbody>
            {averageLeaderBoard.map((user: any) => (
              <tr key={user.users}>
                <td className="border px-8 py-4">{user.users}</td>
                <td className="border px-8 py-4">{user.average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboards;
