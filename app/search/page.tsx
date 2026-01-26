'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { getPaystack } from '@/lib/paystack-client'  // ← use this

interface Trip {
    id: string
    title: string
    from_place: string
    to_place: string
    departure_date: string
    price: number
    seats_available: number
}

export default function SearchPage() {
    const [fromPlace, setFromPlace] = useState('')
    const [toPlace, setToPlace] = useState('')
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(false)

    const searchTrips = async () => {
        setLoading(true)
        let query = supabase.from('trips').select('*')
        if (fromPlace) query = query.ilike('from_place', `%${fromPlace}%`)
        if (toPlace) query = query.ilike('to_place', `%${toPlace}%`)
        const { data, error } = await query
        if (error) console.error(error)
        else setTrips(data || [])
        setLoading(false)
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Search Trips</h1>

            <div className="flex gap-4 mb-8">
                <Input placeholder="From (e.g. Accra)" value={fromPlace} onChange={(e) => setFromPlace(e.target.value)} />
                <Input placeholder="To (e.g. Cape Coast)" value={toPlace} onChange={(e) => setToPlace(e.target.value)} />
                <Button onClick={searchTrips} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>

            <div className="grid gap-6">
                {trips.map((trip) => (
                    <Card key={trip.id}>
                        <CardHeader>
                            <CardTitle>{trip.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>From: {trip.from_place} → To: {trip.to_place}</p>
                            <p>Date: {format(new Date(trip.departure_date), 'PPP p')}</p>
                            <p>Price: ₦{trip.price}</p>
                            <p>Seats left: {trip.seats_available}</p>

                            <Button
                                className="mt-4 w-full"
                                onClick={async () => {
                                    const { data: { user } } = await supabase.auth.getUser()
                                    if (!user || !user.email) {
                                        alert("Login first!")
                                        window.location.href = '/login'
                                        return
                                    }

                                    const { data: booking, error: bookingError } = await supabase
                                        .from('bookings')
                                        .insert({ user_id: user.id, trip_id: trip.id, status: 'pending' })
                                        .select()
                                        .single()

                                    if (bookingError || !booking) {
                                        alert("Booking failed")
                                        return
                                    }

                                    const paystack = await getPaystack()  // ← reusable call

                                    paystack.newTransaction({
                                        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
                                        email: user.email,
                                        amount: trip.price * 100,
                                        reference: `booking_${booking.id}`,
                                        onSuccess: async () => {
                                            await supabase.from('payments').insert({
                                                booking_id: booking.id,
                                                reference: `booking_${booking.id}`,
                                                amount: trip.price,
                                                status: 'success'
                                            })
                                            await supabase.from('bookings').update({ status: 'paid' }).eq('id', booking.id)
                                            alert("Payment successful! Booking confirmed.")
                                        },
                                        onCancel: () => alert("Payment cancelled")
                                    })
                                }}
                            >
                                Book Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {trips.length === 0 && !loading && (
                    <p className="text-center text-gray-500">No trips found. Try different places.</p>
                )}
            </div>
                <h1>Fuck</h1>
                <p>Heee</p>
        </div>
    )
}