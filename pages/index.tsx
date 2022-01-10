import type { NextPage } from "next";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useAuth } from "../util/auth";

const Home: NextPage = () => {
  const { user, signIn } = useAuth();

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="font-bold text-2xl text-center">Wordle With Friends</h1>
      {user ? (
        <Link href="/submit" passHref>
          <div className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go to Submit page
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
  );
};

export default Home;
