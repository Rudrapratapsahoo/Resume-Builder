import { supabase } from "./supabase";

export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, user: data.user };
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, user: data.user };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Logged out successfully" };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return { ok: false, message: error.message };
  return { ok: true, user: data.user };
};
