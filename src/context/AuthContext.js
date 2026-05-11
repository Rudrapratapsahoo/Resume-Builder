"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}