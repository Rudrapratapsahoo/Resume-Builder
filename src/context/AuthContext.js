"use client";

import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // SIGN UP
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return { error };
    }
    setUser(data.user);
    return { error: null };
  };

  // SIGN IN
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error };
    }
    setUser(data.user);
    return { error: null };
  };

  // SIGN OUT
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
