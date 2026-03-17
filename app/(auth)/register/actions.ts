'use server'

import { createClient } from '@/lib/supabase/server'

export async function handleRegister(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  // 1. Create the Account in Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName } 
    }
  })

  if (authError) return { error: authError.message }

  // 2. Create the Profile as a TRAVELER
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: fullName,
      email: email,
      role: 'TRAVELER' 
    })

    if (profileError) return { error: "Auth worked, but profile failed: " + profileError.message }
  }

  return { success: true }
}