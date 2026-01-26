'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-10 text-4xl">Loading...</div>

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="text-center space-y-12">
        {user ? (
          <>
            <h1 className="text-6xl font-bold text-green-700">Hi {user.email}!</h1>
            <p className="text-4xl">Ready for a fun trip?</p>
            
            <Button size="lg" className="text-4xl py-12 px-24 bg-green-500 hover:bg-green-600 rounded-2xl shadow-2xl">
              <Link href="/search">Search Trips</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-6xl font-bold text-blue-700">Brilliant Tour</h1>
            <p className="text-4xl">Let's book a trip together!</p>
            <Button size="lg" className="text-4xl py-12 px-24 bg-green-500 hover:bg-green-600 rounded-2xl shadow-2xl">
              <Link href="/login">Login First</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}