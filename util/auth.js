import React, { useContext, useState, useEffect, createContext } from "react";
import supabase, { signInWithDiscord, signOut } from "./supabase";

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
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  //   const signInWithDiscord = async () => {
  //     console.log("signInWithDiscord");
  //     const { user, session, error } = await supabase.auth.signIn({
  //       provider: "discord",
  //     });
  //     if (error) {
  //       console.error(error);
  //     }
  //   };

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
