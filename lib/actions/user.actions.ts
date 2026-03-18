"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getLoggedInUser() {
  try {
    const supabase = await createClient();

    // 1. Get the Auth User from Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    // 2. Get the Role/Profile details
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // 3. Return a clean object with everything the UI needs
    return {
      id: user.id,
      email: user.email,
      role: profile?.role || "traveler", // Default to traveler if no role found
      full_name: profile?.full_name,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function signUpUser(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;

    // 1. Create the Account in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) return { error: authError.message };

    // 2. Create the Profile as a traveler
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email,
        role: "traveler",
      });

      if (profileError) {
        return {
          error: "Auth worked, but profile failed: " + profileError.message,
        };
      }
    }

    return { success: true };
  } catch (error) {
    console.error("signUpUser error:", error);
    return { error: "Registration failed" };
  }
}

export async function signInUser(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Sign in the user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Login failed" };
  }

  try {
    // 2. Fetch the User's Role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("DATABASE ERROR:", profileError.message);
      return { error: "Could not verify user role." };
    }

    // 3. Traffic Controller (standardized)
    const userRole = (profile?.role || "").toLowerCase().trim();

    if (userRole === "admin") {
      redirect("/admin");
    } else if (userRole === "operator") {
      redirect("/dashboard/operator");
    } else {
      redirect("/");
    }
  } catch (error) {
    console.error("signInUser error:", error);
    return { error: "Login succeeded, but role check failed." };
  }
}

export async function signOutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("signOutUser error:", error);
  }

  redirect("/");
}
