// components/TourCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin, Clock } from "lucide-react";

export function TourCard({ tour }: { tour: any }) {
  return (
    <div className="flex flex-col border border-white/10 bg-black/40 rounded-3xl overflow-hidden hover:shadow-2xl transition-all group">
      <div className="relative h-[250px] w-full">
        <Image 
          src={tour.image_url || "/default-bus.jpg"} 
          alt={tour.destination}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full bold-18">
          GH₵ {tour.price}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flexBetween">
          <h3 className="bold-20 text-white">{tour.origin} → {tour.destination}</h3>
          <span className="text-green-500 text-sm font-bold">{tour.bus_type}</span>
        </div>

        <div className="flex flex-col gap-2 text-gray-300">
          <div className="flex items-center gap-2"><MapPin size={16}/> {tour.operators.company_name}</div>
          <div className="flex items-center gap-2">
            <Clock size={16}/> 
            {new Date(tour.departure_time).toLocaleDateString()} at {new Date(tour.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <div className="flex items-center gap-2"><Bus size={16}/> {tour.available_seats} Seats Left</div>
        </div>

        <Link href={`/book/${tour.id}`}>
          <button className="w-full mt-4 bg-green-600 py-4 rounded-xl bold-16 hover:bg-green-700 transition-colors">
            Book This Seat
          </button>
        </Link>
      </div>
    </div>
  );
}