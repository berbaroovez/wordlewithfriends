import { useEffect } from "react";
import { useAuth } from "../util/auth";
import { getUsersSubmissions } from "../util/supabase";

const Dashboard = () => {
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      getUsersSubmissions(user.id);
    }
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
    </div>
  );
};

export default Dashboard;
