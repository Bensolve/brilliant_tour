"use server";

import { createClient } from "@/lib/supabase/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export async function createBookingForUser(input: { tripId: string }) {
  try {
    const user = await getLoggedInUser();
    if (!user) return { error: "Unauthorized" as const };

    const supabase = await createClient();

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({ user_id: user.id, trip_id: input.tripId, status: "pending" })
      .select()
      .single();

    if (error || !booking) return { error: error?.message || "Booking failed" as const };

    return { data: booking };
  } catch (error) {
    console.error("createBookingForUser error:", error);
    return { error: "Booking failed" as const };
  }
}

export async function createReferralBooking(input: {
  tripId: string;
  totalPrice: number;
  scoutId: string | null;
  adminFee: number;
  scoutEarning: number;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          trip_id: input.tripId,
          total_price: input.totalPrice,
          scout_id: input.scoutId,
          admin_fee: input.adminFee,
          scout_earning: input.scoutEarning,
          status: "pending",
        },
      ])
      .select();

   if (error) return { error: error.message };
    return { data };
  } catch (error) {
    console.error("createReferralBooking error:", error);
    return { error: "Booking failed" as const };
  }
}

export async function recordPaymentAndMarkBookingPaid(input: {
  bookingId: string;
  reference: string;
  amount: number;
}) {
  try {
    const user = await getLoggedInUser();
    if (!user) return { error: "Unauthorized" as const };

    const supabase = await createClient();

    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: input.bookingId,
      reference: input.reference,
      amount: input.amount,
      status: "success",
    });

   if (paymentError) return { error: paymentError.message };

    const { error: bookingError } = await supabase
      .from("bookings")
      .update({ status: "paid" })
      .eq("id", input.bookingId);

    if (bookingError) return { error: bookingError.message };

    return { success: true as const };
  } catch (error) {
    console.error("recordPaymentAndMarkBookingPaid error:", error);
    return { error: "Payment update failed" as const };
  }
}
