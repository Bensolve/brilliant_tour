"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { usePathname } from 'next/navigation'
export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname()

  // Hide on these pages
  if (pathname === '/login' || pathname === '/register') {
    return null
  }
  return (
    <nav className="bg-gray-900 text-white" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold flex items-center gap-2"
            aria-label="Home"
          >
            <Home size={24} /> Brilliant Tour
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="flex items-center gap-2 hover:text-gray-300"
              aria-label="Search Trips"
            >
              <Search size={20} /> Search Trips
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-gray-300"
              aria-label="My Trips"
            >
              <User size={20} /> My Trips
            </Link>
            <Button
              variant="ghost"
              size="sm"
             className="text-white hover:text-white hover:bg-gray-800/50"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          {/* Mobile button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close" : "Menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-6 space-y-8 text-center">
            <Link
              href="/"
              className="block text-xl flex items-center justify-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <Home size={24} /> Home
            </Link>
            <Link
              href="/search"
              className="block text-xl flex items-center justify-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <Search size={24} /> Search Trips
            </Link>
            <Link
              href="/dashboard"
              className="block text-xl flex items-center justify-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <User size={24} /> My Trips
            </Link>

            <Button
             variant="ghost"
              className="w-full flex items-center justify-center gap-3 text-xl py-6"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              <LogOut size={24} />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
