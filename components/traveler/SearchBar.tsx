"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const router = useRouter();
  
  // State for all fields
  const [keywords, setKeywords] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      query: keywords,
      to: destination,
      days: duration
    });
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex w-full max-w-6xl flex-col lg:flex-row items-center gap-4 lg:gap-0 rounded-[32px] lg:rounded-full bg-white p-4 lg:p-2 shadow-2xl border border-slate-100 z-30 relative"
    >
      {/* 1. KEYWORDS FIELD */}
      <div className="flex flex-1 items-center px-4 w-full lg:border-r border-slate-100">
        <Search className="text-green-50 mr-3 shrink-0" size={20} />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Keywords</label>
          <input
            type="text"
            placeholder="Type your keywords..."
            className="border-none bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-300 font-medium h-8 text-sm"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      </div>

      {/* 2. DESTINATION FIELD */}
      <div className="flex flex-1 items-center px-4 w-full lg:border-r border-slate-100">
        <MapPin className="text-green-50 mr-3 shrink-0" size={20} />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Destination</label>
          <select 
            className="border-none bg-transparent focus:outline-none text-slate-900 font-medium h-8 text-sm appearance-none cursor-pointer"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Anywhere</option>
            <option value="accra">Accra</option>
            <option value="kumasi">Kumasi</option>
            <option value="cape-coast">Cape Coast</option>
          </select>
        </div>
      </div>

      {/* 3. DURATION FIELD */}
      <div className="flex flex-1 items-center px-4 w-full">
        <Calendar className="text-green-50 mr-3 shrink-0" size={20} />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Duration</label>
          <select 
            className="border-none bg-transparent focus:outline-none text-slate-900 font-medium h-8 text-sm appearance-none cursor-pointer"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Any duration</option>
            <option value="1">1 Day Tour</option>
            <option value="2-4">2-4 Days</option>
            <option value="5+">5+ Days</option>
          </select>
        </div>
      </div>
      
      {/* 4. SUBMIT BUTTON */}
      <Button 
        type="submit"
        className="w-full lg:w-auto bg-green-50 hover:bg-green-90 text-white rounded-full px-10 h-14 transition-all shadow-lg shadow-green-100/50 flexCenter gap-2"
      >
        <Search size={20} className="stroke-[3px]" />
        <span className="bold-16">Search Now</span>
      </Button>
    </form>
  );
}