'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'

export default function Home() {
 const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-10 text-4xl">Loading...</div>

  return (
  <div className="relative min-h-screen">
    {/* Hero background image */}
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')" }}>
      <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
    </div>

    {/* Content on top */}
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="text-center space-y-8 text-white">
        <h1 className="text-5xl md:text-7xl font-bold">Discover Ghana Adventures</h1>
        <p className="text-2xl md:text-3xl">Book unforgettable trips with friends & family</p>

        {user ? (
          <Button size="lg" className="text-xl md:text-2xl py-6 px-12 bg-green-600 hover:bg-green-700">
            <Link href="/search">Find Your Next Trip</Link>
          </Button>
        ) : (
          <Button size="lg" className="text-xl md:text-2xl py-6 px-12 bg-green-600 hover:bg-green-700">
            <Link href="/login">Login to Start</Link>
          </Button>
        )}
      </div>
    </div>
  </div>
)
}