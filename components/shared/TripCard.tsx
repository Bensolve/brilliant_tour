import Image from "next/image";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripProps {
  title: string;
  location: string;
  price: number;
  image: string;
  duration: string;
  rating: number;
}

export function TripCard({ trip }: { trip: TripProps }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold">{trip.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <MapPin size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">{trip.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">
          {trip.title}
        </h3>

        <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{trip.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div>
            <span className="text-xs text-slate-400 block font-medium">From</span>
            <span className="text-xl font-black text-slate-900">GH₵ {trip.price}</span>
          </div>
          <Button className="bg-slate-900 hover:bg-green-600 text-white rounded-xl group-hover:px-6 transition-all">
            Details <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}