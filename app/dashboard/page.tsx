"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { TripCard } from "@/components/TripCard";
import { Button } from "@/components/ui/button";

import Link from "next/link";


export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const upcoming = bookings.filter(
    (b) => new Date(b.trips?.departure_date) > new Date(),
  );
  const past = bookings.filter(
    (b) => new Date(b.trips?.departure_date) <= new Date(),
  );

  useEffect(() => {
    const fetchBookings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*, trips(title, from_place, to_place, price, departure_date)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setBookings(data || []);
      setLoading(false);
    };

    fetchBookings();
  }, []);



 return (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
      Your Upcoming Adventures 🎉
    </h1>

    {loading ? (
      <p className="text-center text-gray-600">Loading your trips...</p>
    ) : bookings.length === 0 ? (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-700">No Trips Yet</h2>
        <p className="text-gray-600 mt-4">Your next adventure is waiting!</p>
        <Button className="mt-6 bg-green-600 hover:bg-green-700">
          <Link href="/search">Find Your First Trip</Link>
        </Button>
      </div>
    ) : (
      <>
        {upcoming.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 mt-8">Upcoming Trips</h2>
            <div className="grid gap-6">
              {upcoming.map((b) => (
                <TripCard key={b.id} booking={b} />
              ))}
            </div>
          </>
        )}

        {past.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 mt-12">Past Trips</h2>
            <div className="grid gap-6">
              {past.map((b) => (
                <TripCard key={b.id} booking={b} />
              ))}
            </div>
          </>
        )}
      </>
    )}
  </div>
)

}


