import { redirect } from 'next/navigation'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { Plus, Banknote, Users, Map, Settings2, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function OperatorDashboard() {
  const user = await getLoggedInUser()

  // 1. Security Check
  if (!user) redirect('/login')

  // 2. Role Verification
  if (user.role !== 'operator' && user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="p-8 pt-24 max-w-7xl mx-auto min-h-screen bg-white">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Operator Hub</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your assets, scouts, and earnings.</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-5 py-2 rounded-2xl">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-700 text-sm font-bold uppercase tracking-wider">Asset Provider Mode</span>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* ESCROW CARD */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
            <Banknote size={24} />
          </div>
          <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Escrow Balance</h2>
          <p className="text-4xl font-black text-slate-900">GH₵ 0.00</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 w-fit px-3 py-1 rounded-full">
            PENDING COMPLETION
          </div>
        </div>

        {/* ACTIVE BOOKINGS */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
            <Users size={24} />
          </div>
          <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Active Travelers</h2>
          <p className="text-4xl font-black text-slate-900">0</p>
          <p className="mt-4 text-slate-400 text-xs font-medium">Tracking live trip participants</p>
        </div>

        {/* QUICK ACTION: LIST TRIP */}
        <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-slate-200 flex flex-col justify-between group cursor-pointer hover:bg-slate-800 transition-all">
          <div>
            <h2 className="text-white text-2xl font-black mb-2 flex items-center gap-2">
              List New Trip <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Define your route, set your price, and offer a <span className="text-green-400 font-bold">GH₵ 20 Bounty</span> to Scouts.
            </p>
          </div>
          <Button className="mt-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl h-14 font-bold text-lg border-none">
            <Plus size={24} className="mr-2" /> Create Listing
          </Button>
        </div>
      </div>

      {/* TRIP MANAGEMENT SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Map size={24} className="text-green-600" /> Your Active Listings
          </h3>
          <Button variant="ghost" className="text-slate-400 font-bold hover:text-slate-900">
            <Settings2 size={18} className="mr-2" /> Bulk Edit
          </Button>
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] h-80 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
            <Map size={32} className="text-slate-200" />
          </div>
          <h4 className="text-slate-900 font-bold text-lg">No trips listed yet</h4>
          <p className="text-slate-500 max-w-xs mt-2">
            Add your first tour to start receiving bookings and empowering local Scouts.
          </p>
        </div>
      </div>
    </div>
  )
}