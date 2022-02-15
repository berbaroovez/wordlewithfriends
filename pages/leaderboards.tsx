import { useEffect, useState } from "react";
import { getAllSubmissions } from "../util/supabase";
import { guessToPoints } from "../util/functions";
import Table from "../components/Leaderboards/Table";
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

  return (
    <div className="">
      <h1 className="text-center font-bold text-xl p-4">Leaderboards</h1>
      <div className="grid grid-cols lg:grid-cols-2 justify-items-center gap-4">
        <Table title={"Total Points"}>
          {pointsLeaderBoard.map((user: any) => (
            <tr key={user.users} className="even:bg-gray-200 ">
              <td className="border border-r-gray-300 px-8 py-4">
                {user.users}
              </td>
              <td className="border px-8 py-4">{user.total_points}</td>
            </tr>
          ))}
        </Table>

        <Table title={"Average Points"}>
          {averageLeaderBoard.map((user: any) => (
            <tr key={user.users} className="even:bg-gray-200">
              <td className="border border-r-gray-300 px-8 py-4">
                {user.users}
              </td>
              <td className="border px-8 py-4">{user.average}</td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Leaderboards;
