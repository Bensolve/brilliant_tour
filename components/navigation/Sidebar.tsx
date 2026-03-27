"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Briefcase, User, LogOut } from "lucide-react";
import { signOutUser } from "@/lib/actions/user.actions";

const navItems = [
  { name: "Home", href: "/dashboard/traveler", icon: Home },
  { name: "Explore", href: "/tours", icon: Compass },
  { name: "My Trips", href: "/dashboard/traveler/bookings", icon: Briefcase },
  { name: "Profile", href: "/dashboard/traveler/profile", icon: User },
];

interface SidebarProps {
  user: {
    id: string;
    email: string | undefined;
    role: string;
    full_name: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname(); // 👈 This tracks the current page

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 p-6 hidden lg:flex flex-col shadow-sm z-50">
      
      {/* 1. BRANDING: Hajdin-style Logo */}
      <div className="mb-12 mt-2 px-2">
        <h2 className="bold-24 text-blue-70 tracking-tight">
          Brilliant<span className="text-green-50">Tour</span>
          <span className="text-green-50 text-3xl leading-none">.</span>
        </h2>
      </div>
      
      {/* 2. NAVIGATION: With Active States */}
      <nav className="space-y-3 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-green-50 text-white shadow-md shadow-green-100/50" 
                  : "text-gray-20 hover:bg-slate-50 hover:text-blue-70"
              }`}
            >
              <item.icon 
                size={22} 
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-green-50"
                }`} 
              />
              <span className={`${isActive ? "bold-16" : "regular-16"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 3. USER PROFILE: Premium bottom section */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          {/* Avatar using the blue-70 token */}
          <div className="h-12 w-12 rounded-full bg-blue-70 flex-shrink-0 flex items-center justify-center text-white bold-16 shadow-inner">
            {user.full_name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="bold-16 text-slate-900 truncate">
              {user.full_name}
            </span>
            <span className="regular-14 text-gray-30 uppercase tracking-widest">
              {user.role}
            </span>
          </div>
        </div>

        {/* 4. LOGOUT ACTION */}
        <form action={signOutUser} className="w-full">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-30 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all regular-16 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}