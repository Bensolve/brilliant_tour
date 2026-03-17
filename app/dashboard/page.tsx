"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  Calendar, MapPin, Ticket, ChevronRight, 
  PlaneTakeoff, History, User, LogOut, 
  Heart, Camera, Loader2
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// 1. Import your centralized types
import { Trip, Booking, UserProfile } from "@/types";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"trips" | "profile" | "saved">("trips");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<UserProfile>({
    full_name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const [bookingsRes, profileRes] = await Promise.all([
        supabase
          .from("bookings")
          .select("*, trips(title, from_place, to_place, price, departure_date)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
      ]);

      if (!bookingsRes.error) setBookings(bookingsRes.data || []);
      
      // Fixed: Create a consolidated profile object
      const fetchedProfile = profileRes.data || { 
        id: user.id, 
        email: user.email, 
        full_name: "", 
        phone: "" 
      };

      setProfile(fetchedProfile);

      // Sync data to the form state immediately
      setFormData({
        full_name: fetchedProfile.full_name || "",
        phone: fetchedProfile.phone || "",
        email: fetchedProfile.email || ""
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle Input Changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save Profile to Supabase
  const handleSaveProfile = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        });

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...formData } : null);
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile. Check your SQL table!");
      }
    }
    setIsSaving(false);
  };

  const upcoming = bookings.filter(b => 
    b.trips?.departure_date ? new Date(b.trips.departure_date) > new Date() : false
  );
  const past = bookings.filter(b => 
    b.trips?.departure_date ? new Date(b.trips.departure_date) <= new Date() : false
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">
      Syncing Itinerary...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      
      {/* ─── SIDEBAR ───────────────────────────────────── */}
      <aside className="hidden lg:flex w-72 bg-[#1a1a1a] flex-col p-8 fixed h-full shadow-2xl">
        <div className="text-2xl font-black italic text-white mb-12 tracking-tighter">
          Brilliant<span className="text-green-500 text-3xl">.</span>Tour
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavButton 
             icon={<PlaneTakeoff size={18}/>} 
             label="My Journeys" 
             active={activeTab === 'trips'} 
             onClick={() => setActiveTab('trips')} 
          />
          <NavButton 
             icon={<User size={18}/>} 
             label="Traveler Profile" 
             active={activeTab === 'profile'} 
             onClick={() => setActiveTab('profile')} 
          />
          <NavButton 
             icon={<Heart size={18}/>} 
             label="Saved Places" 
             active={activeTab === 'saved'} 
             onClick={() => setActiveTab('saved')} 
          />
        </nav>

        <button 
          onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")}
          className="flex items-center gap-3 text-gray-500 hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-all mt-auto p-2"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* ─── MAIN AREA ─────────────────────────────────── */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        <header className="bg-white border-b border-gray-100 p-8 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {activeTab === 'trips' ? "Your Itinerary" : "Profile Settings"}
            </h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
              Member ID: {profile?.id?.slice(0, 8) || 'N/A'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{profile?.full_name || 'New Explorer'}</p>
              <p className="text-[10px] text-green-600 font-black tracking-tighter uppercase">Pro Member</p>
            </span>
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold border-4 border-green-50 shadow-lg">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl">
          {activeTab === 'trips' && (
            <div className="space-y-12">
              <section>
                <SectionHeader title="Active & Upcoming" count={upcoming.length} />
                <div className="grid gap-4">
                  {upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
                  {upcoming.length === 0 && <EmptyState message="No upcoming trips planned yet." />}
                </div>
              </section>

              <section>
                <SectionHeader title="Travel History" count={past.length} />
                <div className="grid gap-4 opacity-60">
                  {past.map(b => <BookingCard key={b.id} booking={b} isPast />)}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-2xl shadow-sm">
               <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-50">
                  <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                    <Camera className="text-gray-300" size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Personal Details</h3>
                    <p className="text-gray-400 text-sm">Updates will be used for your future travel vouchers.</p>
                  </div>
               </div>

               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup 
                      label="Full Name" 
                      name="full_name"
                      value={formData.full_name} 
                      onChange={handleInputChange}
                    />
                    <InputGroup 
                      label="Phone Number" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <InputGroup 
                    label="Email Address" 
                    name="email"
                    value={formData.email} 
                    disabled 
                  />
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-[#46a353] hover:bg-[#3d8e48] px-10 py-6 rounded-xl font-black text-[10px] tracking-[0.2em] shadow-lg shadow-green-500/20"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                      {isSaving ? "SAVING..." : "SAVE PROFILE CHANGES"}
                    </Button>
                  </div>
               </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── TYPED MINI COMPONENTS ────────────────────────────

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all ${active ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );
}

function SectionHeader({ title, count }: { title: string, count: number }) {
  return (
    <div className="flex items-center gap-4 mb-6">
       <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{title}</h2>
       <div className="h-[1px] flex-1 bg-gray-100" />
       <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500">{count}</span>
    </div>
  );
}

function BookingCard({ booking, isPast }: { booking: Booking, isPast?: boolean }) {
  const trip = booking.trips;
  const isPaid = booking.status === 'paid';

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-xl transition-all hover:border-green-100">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${isPaid ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
            {booking.status}
          </span>
          <span className="text-[9px] text-gray-300 font-black tracking-widest uppercase">REF: {booking.id.slice(0,8)}</span>
        </div>
        <h4 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{trip?.title || "Unknown Trip"}</h4>
        <div className="flex gap-6 mt-3 text-sm text-gray-400 font-medium">
          <span className="flex items-center"><MapPin size={14} className="mr-1 text-green-500"/> {trip?.to_place}</span>
          <span className="flex items-center"><Calendar size={14} className="mr-1 text-green-500"/> {trip?.departure_date && format(new Date(trip.departure_date), 'MMM dd, yyyy')}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {isPaid ? (
          <Button variant="outline" className="text-[10px] font-black tracking-widest border-2 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">VIEW TICKET</Button>
        ) : (
          <Button className="bg-amber-500 hover:bg-amber-600 text-[10px] font-black tracking-widest text-white shadow-lg shadow-amber-500/20">PAY NOW</Button>
        )}
        <ChevronRight size={20} className="text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function InputGroup({ label, ...props }: InputGroupProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
      <input 
        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-green-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
        {...props} 
      />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-2 border-dashed border-gray-100 rounded-2xl p-12 text-center bg-gray-50/30">
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{message}</p>
      <Link href="/search" className="text-green-600 text-[10px] font-black tracking-[0.2em] mt-4 inline-block hover:underline">FIND AN ADVENTURE</Link>
    </div>
  );
}