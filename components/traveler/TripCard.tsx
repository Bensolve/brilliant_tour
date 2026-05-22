// components/traveler/TripCard.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";

// Update the Trip interface to match your Supabase columns exactly
interface Trip {
  id?: string;
  title: string;
  from_place: string;
  to_place: string;
  price: number;
  departure_date: string;
  image?: string;
  seats_available?: number; // Added for the Search view
}

// Support both a raw Trip (Search) or a Booking (Dashboard)
interface TripCardProps {
  trip?: Trip;
  booking?: {
    id: string;
    status: string;
    trips: Trip | null;
  };
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
];

export function TripCard({ trip: rawTrip, booking }: TripCardProps) {
  // Logic to determine which data to use
  const trip = booking ? booking.trips : rawTrip;
  if (!trip) return null;

  const status = booking?.status || "available";
  const isAvailable = status === "available";

  const imageIndex = trip.title ? trip.title.length % FALLBACK_IMAGES.length : 0;
  const displayImage = trip.image || FALLBACK_IMAGES[imageIndex];

  const formatCedi = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border-none bg-white shadow-lg transition-all hover:shadow-2xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={displayImage}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-5 top-5 rounded-full bg-green-600 px-4 py-1">
          <p className="text-xs font-bold uppercase text-white">
            {isAvailable ? "Available" : status}
          </p>
        </div>
        {/* Scarcity Badge for Search results */}
        {trip.seats_available !== undefined && isAvailable && (
          <div className="absolute right-5 top-5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-slate-900">
            {trip.seats_available} seats left
          </div>
        )}
      </div>

      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900 truncate">{trip.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-slate-700">4.8</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} className="text-green-600" />
            <p className="text-sm font-medium">
              {trip.from_place} to {trip.to_place}
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={18} className="text-green-600" />
            <p className="text-sm font-medium">
              {new Date(trip.departure_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Price
            </p>
            <p className="text-xl font-black text-green-600">{formatCedi(trip.price)}</p>
          </div>

          <Button
            className={`rounded-full px-6 font-bold transition-all ${
              isAvailable
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-slate-800 hover:bg-slate-900 text-white"
            }`}
          >
            {isAvailable ? "Book Now" : "Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}