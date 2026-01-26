'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                window.location.href = '/login'
                return
            }

            const { data, error } = await supabase
                .from('bookings')
                .select('*, trips(title, from_place, to_place, price, departure_date)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (!error) setBookings(data || [])
            setLoading(false)
        }

        fetchBookings()
    }, [])

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings yet.</p>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((b) => (
                        <Card key={b.id}>
                            <CardHeader>
                                <CardTitle>{b.trips?.title || 'Trip'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>From: {b.trips?.from_place} → To: {b.trips?.to_place}</p>
                                <p>Price: ₦{b.trips?.price}</p>
                                <p>Date: {new Date(b.trips?.departure_date).toLocaleDateString()}</p>
                                <p className={b.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                                    Status: {b.status.toUpperCase()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}