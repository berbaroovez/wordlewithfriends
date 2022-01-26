import { useAuth } from "../util/auth";
import Link from "next/link";
import DropdownBasic from "./Dropdown";
const Navbar = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="bg-slate-400">
      <div className="mx-8 grid justify-between grid-flow-col items-center py-2 font-medium">
        <div>
          <Link href="/">
            <a>WwF</a>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="grid grid-flow-col items-center ">
              <img
                className="h-8 w-8 rounded-full mr-2"
                src={user.user_metadata.picture}
                alt="discord profile photo"
              />
              {/* <Link href="/dashboard">{user.user_metadata.name}</Link> */}
              <DropdownBasic username={user.user_metadata.name} />
              {/* <div
                onClick={signOut}
                className="bg-slate-400 hover:bg-red-500 hover:cursor-pointer p-1 pl-2 ml-4 rounded-sm"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </div> */}
            </div>
          ) : (
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={signIn}
            >
              Login with Discord
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
