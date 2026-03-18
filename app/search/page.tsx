"use client";

import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { getPaystack } from '@/lib/paystack-client';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { createBookingForUser, recordPaymentAndMarkBookingPaid } from '@/lib/actions/booking.actions';
import { searchTrips as searchTripsAction } from '@/lib/actions/trip.actions';
import { MapPin, Calendar, Search, Star, Clock, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';

interface Trip {
    id: string;
    title: string;
    from_place: string;
    to_place: string;
    departure_date: string;
    price: number;
    seats_available: number;
    image_url?: string;
}

export default function SearchPage() {
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);

    // 1. Define the function BEFORE the useEffect (Fixes the ESLint error)
    const searchTrips = useCallback(async () => {
        setLoading(true);
        try {
            const result = await searchTripsAction({ fromPlace, toPlace });
            if ("error" in result) throw new Error(result.error);
            setTrips(result.data || []);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    }, [fromPlace, toPlace]); // Dependencies for search

    // 2. Now the useEffect can safely call searchTrips
    useEffect(() => {
        searchTrips();
    }, [searchTrips]);

    const handleBooking = async (trip: Trip) => {
        const user = await getLoggedInUser();
        if (!user || !user.email) {
            alert("Please login to book your adventure!");
            window.location.href = '/login';
            return;
        }

        const bookingRes = await createBookingForUser({ tripId: trip.id });
        if ("error" in bookingRes) {
            alert(bookingRes.error || "Booking failed. Please try again.");
            return;
        }
        const booking = bookingRes.data;

        const paystack = await getPaystack();
        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: user.email,
            amount: trip.price * 100, 
            reference: `booking_${booking.id}`,
            onSuccess: async () => {
                const payRes = await recordPaymentAndMarkBookingPaid({
                    bookingId: booking.id,
                    reference: `booking_${booking.id}`,
                    amount: trip.price,
                });
                if ("error" in payRes) {
                    alert("Payment saved but booking update failed: " + payRes.error);
                    return;
                }
                alert("Payment successful! Pack your bags.");
            },
            onCancel: () => alert("Payment cancelled")
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] pb-20">
            {/* Header Section */}
            <div className="bg-[#1a1a1a] py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Search Results</h1>
                    <div className="flex items-center justify-center text-green-500 text-sm font-bold tracking-widest uppercase">
                        <span>Home</span>
                        <ArrowRight size={14} className="mx-2" />
                        <span className="text-gray-400">Tour List</span>
                    </div>
                </div>
            </div>

            {/* Floating Search Bar (Main 5 Style) */}
            <div className="max-w-6xl mx-auto -mt-10 px-6">
                <div className="bg-white rounded-xl shadow-xl p-2 md:p-3 flex flex-col md:flex-row items-center border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="flex items-center px-6 py-4">
                            <MapPin className="text-green-500 mr-4 shrink-0" size={20} />
                            <div className="text-left w-full">
                                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-tighter">From Where?</label>
                                <input 
                                    type="text" 
                                    placeholder="Origin city" 
                                    value={fromPlace}
                                    onChange={(e) => setFromPlace(e.target.value)}
                                    className="w-full outline-none text-gray-800 font-bold text-sm bg-transparent" 
                                />
                            </div>
                        </div>
                        <div className="flex items-center px-6 py-4">
                            <MapPin className="text-green-500 mr-4 shrink-0" size={20} />
                            <div className="text-left w-full">
                                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-tighter">To Destination</label>
                                <input 
                                    type="text" 
                                    placeholder="Where to?" 
                                    value={toPlace}
                                    onChange={(e) => setToPlace(e.target.value)}
                                    className="w-full outline-none text-gray-800 font-bold text-sm bg-transparent" 
                                />
                            </div>
                        </div>
                        <div className="p-1">
                            <Button 
                                onClick={searchTrips} 
                                disabled={loading}
                                className="w-full bg-[#46a353] hover:bg-[#3d8e48] h-full rounded-lg text-sm font-black tracking-widest transition-all py-4 md:py-0"
                            >
                                <Search className="mr-2" size={18} /> {loading ? 'SEARCHING...' : 'SEARCH'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-16">
                {loading ? (
                    <div className="text-center py-20 font-bold tracking-[0.2em] text-gray-400 uppercase animate-pulse">
                        Searching for available trips...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {trips.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                                <div className="relative h-64 bg-gray-200">
                                    <Image 
                                        src={trip.image_url || "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800"} 
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute top-0 right-0 bg-green-500 text-white px-5 py-2 font-black text-lg shadow-lg">
                                        ₦{trip.price.toLocaleString()}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase text-gray-700 flex items-center">
                                        <ShieldCheck size={12} className="mr-1 text-green-600" /> Insured Trip
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                                        <span className="text-[10px] text-gray-400 font-bold ml-2">(4.9/5)</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors leading-snug">{trip.title}</h3>
                                    
                                    <div className="flex items-center text-gray-400 text-sm mb-6 font-medium">
                                        <MapPin size={14} className="mr-1 text-green-500" /> 
                                        {trip.from_place} <ArrowRight size={12} className="mx-2" /> {trip.to_place}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50 mb-6">
                                        <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Calendar size={14} className="mr-2 text-green-500" /> 
                                            {format(new Date(trip.departure_date), 'MMM dd')}
                                        </div>
                                        <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Users size={14} className="mr-2 text-green-500" /> 
                                            {trip.seats_available} Left
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={() => handleBooking(trip)}
                                        className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold transition-all rounded-lg py-6"
                                    >
                                        BOOK THIS ADVENTURE
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}