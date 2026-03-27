"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Briefcase, User, LogOut } from "lucide-react";
import { signOutUser } from "@/lib/actions/user.actions";

const navItems = [
  { name: "Home", href: "/dashboard/traveler", icon: Home },
  { name: "Explore", href: "/tours", icon: Compass },
  { name: "Trips", href: "/dashboard/traveler/bookings", icon: Briefcase }, // 👈 Shortened for better mobile spacing
  { name: "Profile", href: "/dashboard/traveler/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-slate-100 bg-white/90 px-6 py-3 pb-8 backdrop-blur-lg md:hidden shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
      
      {/* 1. MAIN NAV ITEMS */}
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className="group flex flex-col items-center gap-1 transition-all"
          >
            {/* Active Pill Indicator */}
            <div className={`flex items-center justify-center rounded-2xl px-4 py-1 transition-all duration-300 ${
              isActive ? "bg-green-50/10" : "bg-transparent"
            }`}>
              <item.icon 
                size={22} 
                className={`transition-all duration-300 ${
                  isActive ? "text-green-50 scale-110" : "text-gray-30 group-hover:text-green-50 group-hover:scale-105"
                }`} 
                fill={isActive ? "currentColor" : "none"} 
              />
            </div>
            
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isActive ? "text-green-50" : "text-gray-30"
            }`}>
              {item.name}
            </span>
          </Link>
        );
      })}

      {/* 2. LOGOUT BUTTON */}
      <form action={signOutUser} className="flex flex-col items-center">
        <button 
          type="submit" 
          className="group flex flex-col items-center gap-1 transition-all"
        >
          <div className="flex items-center justify-center rounded-2xl px-4 py-1 transition-all duration-300 group-hover:bg-red-50">
            <LogOut 
              size={22} 
              className="text-gray-30 transition-all duration-300 group-hover:text-red-500 group-hover:scale-105" 
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-30 transition-colors group-hover:text-red-500">
            Exit
          </span>
        </button>
      </form>
    </nav>
  );
}