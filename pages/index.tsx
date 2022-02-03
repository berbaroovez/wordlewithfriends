import type { NextPage } from "next";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useAuth } from "../util/auth";
import supabase, { getAllSubmissions } from "../util/supabase";
import { useEffect, useState } from "react";
import ThreeDWordle from "../components/3dWordle";
const Home: NextPage = () => {
  const { user, signIn } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pointsLeaderBoard, setPointsLeaderBoard] = useState<any[]>([]);
  useEffect(() => {
    const getSubmissions = async () => {
      const response = await getAllSubmissions();
      if (response.error === false) {
        if (Array.isArray(response.message)) {
          console.log("uo", response.message);
          setSubmissions(response.message);
        }
      }
    };
    getSubmissions();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="font-bold text-2xl text-center">Wordle With Friends</h1>
        {user ? (
          <Link href="/leaderboards" passHref>
            <div className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Go to leaderboards
            </div>
          </Link>
        ) : (
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={signIn}
          >
            Login with Discord
          </button>
        )}
      </div>
      {/* <ThreeDWordle /> */}
    </div>
  );
};

export default Home;
