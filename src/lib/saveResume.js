import { supabase } from "./supabase";

// Load resume from localStorage
export const loadResume = () => {
  if (typeof window === "undefined")
    return null;

  const saved =
    localStorage.getItem(
      "resumeData"
    );

  return saved
    ? JSON.parse(saved)
    : null;
};

// Save resume to Supabase
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

// Get all resumes of user
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

// Update resume
export const updateResume =
  async (
    resumeId,
    updatedData
  ) => {
    const { data, error } =
      await supabase
        .from("resumes")
        .update(updatedData)
        .eq("id", resumeId)
        .select();

    return { data, error };
  };

// Delete resume
export const deleteResume =
  async (resumeId) => {
    const { data, error } =
      await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId);

    return { data, error };
  };