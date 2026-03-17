'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trip } from '@/types';

export default function BookingComponent({ trip }: { trip: Trip }) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);

    // 1. GATHER THE DATA
    // We grab the Scout ID we saved in Phase 2 from the browser's memory
    const scoutId = localStorage.getItem('brilliant_tour_ref');

    // 2. THE CAKE MATH (The Split)
    const bounty = trip.scout_bounty || 0;
    const adminCut = bounty * 0.15;   // Your 15%
    const scoutCut = bounty * 0.85;   // Scout's 85%

    // 3. SAVE TO SUPABASE
    // We create the booking as 'pending' until they pay
    const { data, error } = await supabase.from('bookings').insert([
      {
        trip_id: trip.id,
        total_price: trip.price,
        scout_id: scoutId,      // This links the sale to the Scout!
        admin_fee: adminCut,    // Your profit recorded
        scout_earning: scoutCut, // Scout's profit recorded
        status: 'pending',
      },
    ]).select();

    if (error) {
      alert("Error creating booking: " + error.message);
    } else {
      alert("Booking saved! Now redirecting to MoMo payment...");
      // Here is where you would call your Paystack function
    }
    
    setLoading(false);
  };

  return (
    <div className="border-t pt-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500 text-sm">Total Price</p>
          <p className="text-2xl font-bold">GH₵ {trip.price}</p>
        </div>
        <button 
          onClick={handleBooking}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          {loading ? 'Processing...' : 'Book Now with MoMo'}
        </button>
      </div>
      <p className="text-xs text-center text-gray-400">
        🔒 Secured by Paystack. No credit card needed.
      </p>
    </div>
  );
}