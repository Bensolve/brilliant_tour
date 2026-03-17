'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function handleLogin(prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Sign in the user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || "Login failed" }
  }

 // 2. Fetch the User's Role from your 'profiles' table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  // 🕵️ Check if the database query actually worked
  if (profileError) {
    console.error("DATABASE ERROR:", profileError.message)
    return { error: "Could not verify user role." }
  }

  // 3. The "Traffic Controller" logic
  // Use .trim() to remove invisible spaces and .toUpperCase() for safety
  const userRole = profile?.role?.trim().toUpperCase()

  console.log("DEBUG: Final processed role:", `"${userRole}"`) // The quotes help see hidden spaces

  if (userRole === 'ADMIN') {
    console.log("SUCCESS: Redirecting to /admin")
    redirect('/admin')
    } else if (userRole === 'OPERATOR') {
  // 🚀 The new path for the Service Providers
  redirect('/dashboard/operator');
  } else {
    console.log("DENIED: Redirecting to home")
    redirect('/')
  }
}