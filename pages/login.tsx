import supabase, { signInWithDiscord } from "../util/supabase";

const Login = () => {
  //   const testFunction = () => {
  //     console.log("KEYS", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  //   };
  return (
    <div>
      <button
        onClick={signInWithDiscord}
        className="bg-violet-700 p-3 rounded text-white "
      >
        Sign in with discord
      </button>
    </div>
  );
};

export default Login;
