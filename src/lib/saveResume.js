import { supabase } from "./supabase";

export const saveResume = async (
  resumeData,
  userId
) => {
  const { data, error } =
    await supabase
      .from("resumes")
      .insert([
        {
          user_id: userId,
          ...resumeData,
        },
      ])
      .select();

  return { data, error };
};

export const getUserResumes =
  async (userId) => {
    const { data, error } =
      await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    return { data, error };
  };

export const updateResume =
  async (resumeId, updatedData) => {
    const { data, error } =
      await supabase
        .from("resumes")
        .update(updatedData)
        .eq("id", resumeId)
        .select();

    return { data, error };
  };

export const deleteResume =
  async (resumeId) => {
    const { data, error } =
      await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId);

    return { data, error };
  };