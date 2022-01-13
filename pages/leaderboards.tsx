import { useEffect, useState } from "react";
import { getAllSubmissions } from "../util/supabase";

const Leaderboards = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pointsLeaderBoard, setPointsLeaderBoard] = useState<any[]>([]);
  useEffect(() => {
    const getSubmissions = async () => {
      const response = await getAllSubmissions();
      if (response.error === false) {
        if (Array.isArray(response.message)) {
          setSubmissions(response.message);
          setPointsLeaderBoard(calculateTotalPoints(response.message));
        }
      }
    };
    getSubmissions();
  }, []);

  const calculateTotalPoints = (inputArray: any[]) => {
    const tempArray: any[] = [];
    const alreadyChecked: any[] = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (!alreadyChecked.includes(inputArray[i].user_id.id)) {
        alreadyChecked.push(inputArray[i].user_id.id);
        const tempObject = {
          user_id: inputArray[i].user_id.username,
          total_points: 0,
        };

        for (let j = i; j < inputArray.length; j++) {
          if (inputArray[i].user_id.id === inputArray[j].user_id.id) {
            // console.log("points", inputArray[j].);
            console.log(
              `${inputArray[i].user_id.username} ${inputArray[j].guess_count}`
            );

            tempObject.total_points += guessToPoints(inputArray[j].guess_count);
          }
        }
        tempArray.push(tempObject);
      }
    }
    return tempArray.sort((a, b) => b.total_points - a.total_points);
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
      <h1>Leaderboards</h1>
      <button onClick={() => calculateTotalPoints(submissions)}></button>
      <div>
        <table className="shadow-lg bg-white">
          <thead className="">
            <tr>
              <th className="bg-blue-300 text-left px-8 py-4">Name</th>
              <th className="bg-blue-300  text-left px-8 py-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {pointsLeaderBoard.map((user: any) => (
              <tr key={user.user_id}>
                <td className="border px-8 py-4">{user.user_id}</td>
                <td className="border px-8 py-4">{user.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboards;
