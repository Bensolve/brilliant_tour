"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserRole } from "@/types"; // Import the DNA we just talked about

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
      role: (profile?.role || "traveler").toLowerCase() as UserRole, // <-- Added type safety here too!
      full_name: profile?.full_name,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}



export async function signUpUser(formData: FormData) {
  let targetPath = "/";
  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;
    // Change this:

    const role = (formData.get("role") as string || "traveler").toLowerCase() as UserRole;

    console.log("🚀 STARTING SIGNUP FOR:", email);

    // 1. Create the Account in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: role },
      },
    });

    if (authError) {
      console.error("❌ AUTH ERROR:", authError.message);
      return { error: authError.message };
    }

    console.log("✅ AUTH SUCCESS. User ID:", data.user?.id);

    // 2. Create the Profile
    if (data.user) {
      console.log("📡 ATTEMPTING PROFILE INSERT...");
      
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email,
        role: role,
      });

      if (profileError) {
        console.error("❌ DATABASE PROFILE ERROR:", profileError.message);
        console.error("DEBUG INFO:", { id: data.user.id, fullName, role });
        return {
          error: "Auth worked, but profile failed: " + profileError.message,
        };
      }
      
      console.log("🎉 PROFILE CREATED SUCCESSFULLY!");
    }

    // 3. AUTO-REDIRECT BASED ON ROLE
  
    if (role === "admin") targetPath = "/admin";
    else if (role === "operator") targetPath = "/dashboard/operator";
    else if (role === "traveler") targetPath = "/dashboard/traveler";
    else if (role === "scout") targetPath = "/dashboard/scout";

    

   
  } catch (error) {
    console.error("🚨 CRITICAL SYSTEM ERROR:", error);
    return { error: "Registration failed" };
  }
  redirect(targetPath)
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

  const userRole = (profile?.role || "traveler").toLowerCase() as UserRole;

    // Set the path based on role
    if (userRole === "admin") targetPath = "/admin";
    else if (userRole === "operator") targetPath = "/dashboard/operator";
    else if (userRole === "traveler") targetPath = "/dashboard/traveler";
    else if (userRole === "scout") targetPath = "/dashboard/scout";
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
