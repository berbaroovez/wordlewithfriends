import React, { useContext, useState, useEffect, createContext } from "react";
import supabase, {
  signInWithDiscord,
  signOut,
  updateUserInfo,
} from "./supabase";

//create context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /// get session data if there is an active session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event, session);
        if (event === "SIGNED_IN") {
          await updateUserInfo(
            session.user.user_metadata.full_name,
            session.user.id
          );
        }
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signIn: signInWithDiscord,
    signOut: () => signOut(),

    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
