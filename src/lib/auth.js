import { supabase } from "./supabase";

export const signUpUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  return { data, error };
};

export const loginUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return { data, error };
};

export const logoutUser = async () => {
  const { error } =
    await supabase.auth.signOut();

  return { error };
};

export const getCurrentUser =
  async () => {
    const { data, error } =
      await supabase.auth.getUser();

    return { data, error };
  };