import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function OperatorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. Are they logged in?
  if (!user) redirect('/login')

  // 2. Fetch role to verify they are an Operator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'OPERATOR' && profile?.role !== 'ADMIN') {
    redirect('/') // Kick out if they don't have permission
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Operator Hub</h1>
        <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Asset Provider
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* The "Money" Card */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-gray-500 text-sm">Escrow Balance</h2>
          <p className="text-3xl font-bold">GH₵ 0.00</p>
          <p className="text-xs text-gray-400 mt-2">Releases after trip completion</p>
        </div>

        {/* Action Card: List a Trip */}
        <div className="border p-4 rounded-lg bg-black text-white cursor-pointer hover:bg-gray-800 transition">
          <h2 className="font-bold">+ List New Trip</h2>
          <p className="text-sm opacity-80">Set your route and Scout Bounty</p>
        </div>
      </div>
    </div>
  )
}