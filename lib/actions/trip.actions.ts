"use server";

import { createClient } from "@/lib/supabase/server";

// 1. CREATE TRIP (For Operators)
export async function createTrip(input: {
  title: FormDataEntryValue | null;
  from_place: FormDataEntryValue | null;
  to_place: FormDataEntryValue | null;
  price: number;
  scout_bounty: number;
  departure_date: FormDataEntryValue | null;
  operator_id: string;
}) {
  try {
    const supabase = await createClient();

    const tripData = {
      title: input.title,
      from_place: input.from_place,
      to_place: input.to_place,
      price: input.price,
      scout_bounty: input.scout_bounty,
      departure_date: input.departure_date,
      operator_id: input.operator_id,
    };

    const { error } = await supabase.from("trips").insert([tripData]);

    if (error) return { error: error.message };
    return { success: true as const };
  } catch (error) {
    console.error("createTrip error:", error);
    return { error: "Trip creation failed" as const };
  }
}

// 2. SEARCH TRIPS (Optimized for Traveler Search)
export async function searchTrips(input: { fromPlace?: string; toPlace?: string }) {
  try {
    const supabase = await createClient();

    let query = supabase.from("trips").select("*")
      .gt('seats_available', 0) 
      .gte('departure_date', new Date().toISOString());

    if (input.fromPlace) query = query.ilike("from_place", `%${input.fromPlace}%`);
    if (input.toPlace) query = query.ilike("to_place", `%${input.toPlace}%`);

    const { data, error } = await query;
    if (error) return { error: error.message};

    return { data: data || [] };
  } catch (error) {
    console.error("searchTrips error:", error);
    return { error: "Search failed" as const };
  }
}

// 3. GET FEATURED TOURS (For Traveler Dashboard)
export async function getFeaturedTours() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .gt('seats_available', 0)
      .gte('departure_date', new Date().toISOString())
      .limit(3); 

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error("getFeaturedTours error:", error);
    return [];
  }
}

// 4. GET USER BOOKINGS (The Missing Piece!)
export async function getUserBookings(userId: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        trips (*)
      `)
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error("getUserBookings error:", error);
    return [];
  }
}