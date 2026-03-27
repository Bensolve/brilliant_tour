import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";

interface Trip {
  title: string;
  from_place: string;
  to_place: string;
  price: number;
  departure_date: string;
  image?: string;
}

interface Booking {
  id: string;
  status: string;
  trips: Trip | null;
}


// These are "Unsplash Essentials" - they are rarely removed.
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop", // Mountain
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Beach
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", // Coastal
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop", // Landscape
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", // Nature
];
export function TripCard({ booking }: { booking: Booking }) {
  if (!booking || !booking.trips) return null;

  const trip = booking.trips;
  const isAvailable = booking.status === "available";

  // 2. Generate a stable index based on the title string length
  // This ensures the image stays the same across re-renders for the same trip
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
          src={displayImage} // 3. Use the dynamically selected image
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-5 top-5 rounded-full bg-green-50 px-4 py-1">
          <p className="bold-16 text-white">
            {isAvailable ? "New" : booking.status.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Content Section Remains Unchanged */}
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flexBetween">
          <h3 className="bold-20 text-slate-900 truncate">{trip.title}</h3>
          <div className="flexCenter gap-1">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="bold-16 text-slate-700">4.8</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 regular-16 text-gray-30">
            <MapPin size={18} className="text-green-50" />
            <p>
              {trip.from_place} to {trip.to_place}
            </p>
          </div>
          <div className="flex items-center gap-2 regular-16 text-gray-30">
            <Calendar size={18} className="text-green-50" />
            <p>
              {trip.departure_date
                ? new Date(trip.departure_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })
                : "TBD"}
            </p>
          </div>
        </div>

        <div className="flexBetween mt-2 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <p className="regular-14 text-gray-30 uppercase tracking-wider">
              Price
            </p>
            <p className="bold-20 text-green-50">{formatCedi(trip.price)}</p>
          </div>

          <Button
            className={`rounded-full px-6 font-bold transition-all ${
              isAvailable
                ? "bg-green-50 hover:bg-green-90 text-white"
                : "bg-blue-70 hover:bg-slate-900 text-white"
            }`}
          >
            {isAvailable ? "Book Now" : "Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}