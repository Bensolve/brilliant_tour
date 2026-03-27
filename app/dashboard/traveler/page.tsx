import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getFeaturedTours, getUserBookings } from "@/lib/actions/trip.actions";
import SectionHeader from "@/components/shared/SectionHeader";
import { TripCard } from "@/components/traveler/TripCard";
import SearchBar from "@/components/traveler/SearchBar";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function TravelerHome() {
  const user = await getLoggedInUser();
  if (!user) return redirect("/login");

  const [tours, bookings] = await Promise.all([
    getFeaturedTours(),
    getUserBookings(user.id),
  ]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col min-h-[700px] pb-24 pt-10 lg:pt-20 xl:pb-32 overflow-hidden bg-blue-70 w-full">
        {/* IMAGE LAYER */}
        {/* <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop"
            alt="Ghana Adventure"
            fill
            priority
            className="object-cover brightness-[0.4] contrast-[1.1]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-70/60 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-70/80 via-blue-70/20 to-transparent" />
        </div> */}

        {/* HERO CONTENT */}
        <div className="max-container padding-container relative z-20 flex flex-col w-full">
          <div className="flex flex-col gap-5 max-w-[800px]">
            <div className="flex items-center gap-2 rounded-full bg-green-50/20 px-4 py-2 w-fit backdrop-blur-md">
              <span className="bold-16 text-green-50 uppercase tracking-widest">
                Explore the Gold Coast
              </span>
            </div>

            {/* FIX: Lowered font size for small mobile (bold-40) and added break-words */}
            <h1 className="bold-40 sm:bold-52 lg:bold-88 text-white drop-shadow-2xl leading-[110%] break-words">
              Discover Your <br />
              <span className="text-green-50">Brilliant Adventure</span>
            </h1>

            <p className="regular-18 text-gray-10 xl:max-w-[520px] opacity-90 drop-shadow-md">
              Curated premium tours across Ghana. Experience the culture,
              landscapes, and history with people who know it best.
            </p>
          </div>

          {/* FLOATING SEARCHBAR */}
          <div className="mt-16 lg:-mb-40 relative z-30 w-full">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD BODY */}
      <section className="max-container padding-container py-10 lg:py-20 w-full">
        {/* PENDING BOOKINGS */}
        {bookings?.some((b) => b.status === "pending") && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <div className="flex flex-col gap-2">
              <h3 className="bold-20">Action Required: Pending Booking</h3>
              <p className="regular-16 opacity-90">
                Pay now with MoMo to secure your slot before it expires.
              </p>
            </div>
            <button className="w-full md:w-auto rounded-full bg-white px-8 py-4 text-blue-600 font-bold transition-all hover:bg-slate-100">
              Pay Now
            </button>
          </div>
        )}

        <SectionHeader
          title="Trending Destinations"
          link="/tours"
          linkText="View all tours"
        />

        {/* TRIP GRID */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {tours && tours.length > 0 ? (
            tours.map((tour) => (
              <TripCard
                key={tour.id}
                booking={{
                  id: tour.id,
                  status: "available",
                  trips: tour,
                }}
              />
            ))
          ) : (
            <div className="flex flex-center w-full py-20 col-span-full">
              <p className="regular-18 text-slate-400 italic text-center">
                Exploring new horizons... check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}