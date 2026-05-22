"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export default function DashboardSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't search if the input is empty
    if (!destination.trim()) return;

    // Build the URL parameters
    const params = new URLSearchParams({ to: destination });
    
    // Push the new URL state to the dashboard
    router.push(`/dashboard/traveler?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex gap-3 w-full max-w-2xl bg-white p-2 rounded-2xl shadow-sm border border-slate-100"
      data-testid="search-form"
    >
      <div className="relative flex-1 flex items-center">
        <MapPin className="absolute left-4 h-5 w-5 text-green-600" />
        <input
          type="text"
          placeholder="Where are you going? (e.g., Kumasi)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 focus:outline-none font-medium placeholder:font-normal placeholder:text-slate-400"
          data-testid="destination-input"
        />
      </div>
      <Button 
        type="submit" 
        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 h-12 font-bold transition-all"
      >
        <Search className="h-5 w-5 mr-2" />
        Search
      </Button>
    </form>
  );
}