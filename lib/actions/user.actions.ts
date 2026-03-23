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

  // 1. Authenticate
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email, password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Login failed" };
  }

  // 2. Variable to store the role outside the try block
  let targetPath = "/"; 

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .maybeSingle();

    const userRole = (profile?.role || "traveler").toLowerCase();

    // Set the path based on role
    if (userRole === "admin") targetPath = "/admin";
    else if (userRole === "operator") targetPath = "/dashboard/operator";
    else targetPath = "/";

  } catch (error) {
    console.error("Role check failed:", error);
    // Even if role check fails, we let them in as a standard user
  }

  // 3. REDIRECT ALWAYS HAPPENS OUTSIDE TRY/CATCH
  redirect(targetPath);
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
