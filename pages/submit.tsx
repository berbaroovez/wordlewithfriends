import { useState } from "react";
import { useAuth } from "../util/auth";
import { checkWord } from "../util/supabase";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import ShareCodeInput from "../components/submit/ShareCodeInput";
import ManualInput from "../components/submit/ManualInput";
const Submit = () => {
  const { user, signIn } = useAuth();
  const [useManuelInput, setUseManuelInput] = useState(false);

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
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={() => {
            setUseManuelInput(!useManuelInput);
          }}
          className="bg-slate-400 rounded px-4 py-2 text-sm font-medium text-white w-full"
        >
          {useManuelInput ? "Switch to Code Share" : "Switch to Manual Input"}
        </button>
        {useManuelInput ? <ManualInput /> : <ShareCodeInput />}
      </div>
    </div>
  );
};

export default Submit;
