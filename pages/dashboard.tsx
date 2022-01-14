import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../util/auth";
import { getUsersSubmissions } from "../util/supabase";

const Dashboard = () => {
  const { user, signIn } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const getSubmissions = async () => {
      if (user) {
        const response = await getUsersSubmissions(user.id);
        if (response.error === false) {
          if (Array.isArray(response.message)) {
            setSubmissions(response.message);
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
      <h1 className="text-xl font-medium text-center">Dashboard</h1>
      {submissions && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-3xl ">
          <div className="grid grid-flow-col justify-between">
            <h1 className="font-bold text-2xl">Your Submissions</h1>
            <Link href="/submit">
              <button className="w-40 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Wordle
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap -mx-2 gap-4">
            {submissions.map((submission) => (
              // <div className="w-full sm:w-1/2 px-2">

              <div
                className="bg-white shadow-md rounded-lg px-2 py-3 relative w-64"
                key={submission.id}
              >
                <div className="flex flex-wrap ">
                  <div className="w-full">
                    <h1 className="text-xl font-bold">
                      Wordle {submission.wordle_id.wordle_number}
                    </h1>
                    <p className="font-medium text-slate-400">
                      {submission.wordle_id.word}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-4">
                  <p className="text-sm font-medium text-slate-400">
                    {submission.guess_count}/6{" "}
                    <span className="absolute">
                      {submission.hard_mode ? "*" : ""}
                    </span>
                  </p>
                </div>

                <div className="text-center">
                  {submission.wordle_board &&
                    submission.wordle_board.map((row: string, index: any) => (
                      <div key={Math.random()}>{row}</div>
                    ))}
                </div>
              </div>
              // </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
