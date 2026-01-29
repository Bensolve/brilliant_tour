import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, CheckCircle2 } from "lucide-react";

interface Trip {
  title: string;
  from_place: string;
  to_place: string;
  price: number;
  departure_date: string;
}

interface Booking {
  id: string;
  status: string;
  trips: Trip | null;
}

export function TripCard({ booking }: { booking: Booking }) {
  const trip = booking.trips;
  const isPaid = booking.status === "paid";

  return (
    <Card className="overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-all">
      {/* Fake photo – replace with real later */}
      <div className="h-48 bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <p className="text-white text-xl font-bold">{trip?.title}</p>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{trip?.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} /> {trip?.from_place} → {trip?.to_place}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} />
          {trip?.departure_date
            ? new Date(trip.departure_date).toLocaleDateString()
            : "No date yet"}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={18} /> ₦{trip?.price}
        </div>
        <div
          className={`flex items-center gap-2 font-medium ${isPaid ? "text-green-600" : "text-yellow-600"}`}
        >
          {isPaid ? <CheckCircle2 size={18} /> : null}
          Status: {booking.status.toUpperCase()}
        </div>

        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
