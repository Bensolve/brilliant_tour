// app/explore/page.tsx
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { searchTrips } from "@/lib/actions/trip.actions";
import { TripCard } from "@/components/traveler/TripCard";
import SearchBar from "@/components/traveler/SearchBar";

export default async function ExplorePage({ searchParams }: { searchParams: Promise<any> }) {
  // 1. Identify the guest (The Bouncer)
  const user = await getLoggedInUser(); 
  const params = await searchParams;

  // 2. Get the data from Supabase
  const { data: trips } = await searchTrips({ 
    toPlace: params.toPlace, 
    fromPlace: params.fromPlace 
  });

  return (
    <main className="max-container padding-container py-10">
      {/* 3. The Shape-Shift: If logged in, show a "Welcome Back" UI */}
      {user ? (
        <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h1 className="bold-32">Welcome, {user.firstName}!</h1>
          <p className="regular-16 text-gray-500">Find your next premium adventure below.</p>
        </div>
      ) : (
        <div className="mb-10 p-6 bg-blue-600 rounded-2xl text-white">
          <h1 className="bold-32">Explore Ghana</h1>
          <p className="regular-16 opacity-90">Join 1,000+ travelers. Sign up to book.</p>
        </div>
      )}

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {trips?.map((trip) => (
          <TripCard 
            key={trip.id} 
            booking={{ trips: trip, status: "available", id: trip.id }}
            // Pass the user info so the card knows what button to show
            userId={user?.id} 
          />
        ))}
      </div>
    </main>
  );
}