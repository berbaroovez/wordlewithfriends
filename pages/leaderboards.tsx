import { useEffect, useState } from "react";
import { getAllSubmissions } from "../util/supabase";

const Leaderboards = () => {
  // const [submissions, setSubmissions] = useState<any[]>([]);
  // useEffect(() => {
  //   const getSubmissions = async () => {
  //     const response = await getAllSubmissions();
  //     if (response.error === false) {
  //       if (Array.isArray(response.message)) {
  //         setSubmissions(response.message);
  //       }
  //     }
  //   };
  //   getSubmissions();
  // }, []);
  return (
    <div>
      <h1>Leaderboards</h1>
      <table className="">
        <thead>
          <tr>
            <th className="border border-gray-600 ...">Name</th>
            <th className="border border-gray-600 ...">Points</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Leaderboards;
