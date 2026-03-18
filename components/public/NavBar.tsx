"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Bus, Coins, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const NavLinks = () => (
  <>
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-white hover:text-green-400 transition-all font-medium cursor-pointer"
      >
        {link.label}
      </Link>
    ))}
  </>
);

const PartnerLinks = ({ mobile = false }: { mobile?: boolean }) => (
  <div className={`flex ${mobile ? "flex-col gap-6" : "items-center space-x-8"}`}>
    <Link
      href="/join-operator"
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
    >
      <Bus
        size={mobile ? 20 : 16}
        className="text-green-500 group-hover:scale-110 transition-transform"
      />
      <span className={mobile ? "text-xl" : "text-sm"}>Operators</span>
    </Link>
    <Link
      href="/join-scout"
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
    >
      <Coins
        size={mobile ? 20 : 16}
        className="text-green-500 group-hover:scale-110 transition-transform"
      />
      <span className={mobile ? "text-xl" : "text-sm"}>
        Scouts{" "}
        <span className="ml-1 text-[10px] bg-green-600/20 px-1.5 py-0.5 rounded text-green-400 border border-green-600/30">
          GH₵ 20
        </span>
      </span>
    </Link>
  </div>
);

export function NavBar() {
  const pathname = usePathname();

  const hiddenPaths = ["/login", "/register", "/dashboard", "/admin"];
  if (hiddenPaths.some((path) => pathname.startsWith(path))) return null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl text-white py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold flex items-center gap-2 shrink-0 group"
        >
          <div className="bg-green-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Home size={22} className="text-white" />
          </div>
          <span className="tracking-tighter">
            BRILLIANT<span className="font-light text-gray-300">TOUR</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-10 text-sm">
          <NavLinks />
          <div className="h-5 w-[1px] bg-white/20" />
          <PartnerLinks />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-semibold hover:text-green-400 transition-colors"
          >
            Login
          </Link>
          <Link href="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-95">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors outline-none">
                <Menu size={30} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/95 border-white/10 text-white w-full sm:w-[400px] flex flex-col p-8"
            >
              <SheetHeader className="text-left mb-12">
                <SheetTitle className="text-white text-2xl font-bold flex items-center gap-3">
                  <div className="bg-green-600 p-1.5 rounded-lg">
                    <Home size={20} />
                  </div>
                  BRILLIANT<span className="font-light">TOUR</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-10">
                <div className="flex flex-col gap-8 text-2xl font-semibold">
                  <NavLinks />
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                <PartnerLinks mobile />

                <div className="h-[1px] bg-white/10 w-full" />

                <div className="flex flex-col gap-4 pt-4">
                  <Link href="/register" className="w-full">
                    <Button className="w-full bg-green-600 py-8 rounded-2xl text-xl font-bold">
                      Join the Platform
                    </Button>
                  </Link>
                  <Link href="/login" className="text-center text-gray-400 text-lg py-2">
                    Already a member?{" "}
                    <span className="text-white underline">Login</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

